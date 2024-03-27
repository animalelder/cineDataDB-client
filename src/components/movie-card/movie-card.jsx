import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      border="primary"
      className="p-2 h-100"
      onClick={() => onMovieClick(movie)}
      style={{ cursor: 'pointer' }}>
      <Card.Img alt="movie poster" src={movie.imagePath} />
      <Card.Body>
        <Card.Title className="text-center">{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-center text-muted">MORE INFO</Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string,
    }),
    Featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
