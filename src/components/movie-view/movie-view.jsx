import PropTypes from 'prop-types';

export const MovieView = ({ movie, onCloseClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>ImagePath: </span>
        <span>{movie.imagePath}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button onClick={onCloseClick}>Close</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string,
    imagePath: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
