import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="border-primary shadow-lg h-100">
      <Card.Body>
        <Card.Img alt="movie poster" src={movie.imagePath} />
        <Card.Title as="h5" className="text-center">
          {movie.title}
        </Card.Title>
        <div class="clearfix">
          <Card.Text className="text-uppercase float-left">
            <Badge pill bg="secondary">
              {movie.genre}
            </Badge>
          </Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="btn-sm bg-dark float-end">MORE INFO</Button>
          </Link>
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
};
