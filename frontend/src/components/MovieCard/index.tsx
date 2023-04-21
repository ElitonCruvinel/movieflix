import './styles.css';

import { Movie } from 'type/movie';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card movie-card">
      <div className="movie-card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-card-botton-container">
        <h3>{movie.title}</h3>
        <h4>{movie.year}</h4>
        <h5>{movie.subTitle}</h5>
      </div>
    </div>
  );
};

export default MovieCard;
