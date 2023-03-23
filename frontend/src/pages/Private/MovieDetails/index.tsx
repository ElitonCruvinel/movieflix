import ReviewForm from 'components/ReviewForm';
import { useParams } from 'react-router-dom';
import { hasAnyRoles } from 'util/auth';
import { useEffect, useState } from 'react';
import { Review } from 'type/review';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ReviewListing from 'components/ReviewListing';

import './styles.css';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {

  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config)
      .then((response) => {
        setReviews(response.data);
      });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  }

  return (
    <div className="container">
      <h1>Tela detalhes do filme id: {movieId}</h1>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}
      
      <ReviewListing reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
