// import PropTypes from 'prop-types';

import './movie-view.scss';

export const MovieView = ({ movie, onCloseClick }) => {
  return (
    <div>
      <div className="movie-poster">
        <img src={movie.imagePath} alt="Movie poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      {/*    <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div> */}
      <button className="close-button" onClick={onCloseClick}>
        Close
      </button>
    </div>
  );
};

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     genre: PropTypes.object.isRequired,
//     director: PropTypes.object,
//     imagePath: PropTypes.string,
//     featured: PropTypes.bool,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
