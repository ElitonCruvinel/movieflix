import ReviewForm from 'components/ReviewForm';
import { useParams } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import { useEffect, useState } from 'react';
import { Review } from 'type/review';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import ReviewListing from 'components/ReviewListing';
import { Movie } from 'type/movie';

import './styles.css';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  return (
    <div className="movie-details-container">
      <div className="movie-details-description">
        <div className="movie-details-description-image">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-details-description-botton">
          <h3>{movie?.title}</h3>
          <h4>{movie?.year}</h4>
          <h5>{movie?.subTitle}</h5>
          <div className="movie-details-description-synopsis">
            <h6>{movie?.synopsis}</h6>
          </div>
        </div>
      </div>

      <div className="movie-details-review-form">
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}
      </div>

      <div className="movie-details-review-listing">
        <ReviewListing reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetails;
