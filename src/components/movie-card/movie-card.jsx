import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="border-primary shadow-lg p-2 h-100"
      onClick={() => onMovieClick(movie)}
      style={{ cursor: 'pointer' }}>
      <Card.Img alt="movie poster" src={movie.imagePath} />
      <Card.Body>
        <Card.Title as="h5" className="text-center">
          {movie.title}
        </Card.Title>
        <Card.Text className="text-uppercase fs-6">{movie.genre}</Card.Text>
        <div class="clearfix">
          <Button className="btn-sm bg-dark float-end">MORE INFO</Button>
        </div>
      </Card.Body>
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
