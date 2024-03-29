// import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <Container className="movie-poster">
      <Row>
        <Col className="text-center">
          <img
            src={movie.imagePath}
            className="ratio ratio 2 / 3"
            alt="Movie poster"
          />
        </Col>
      </Row>
      <Row>
        <h1>{movie.title}</h1>
      </Row>
      <Row>
        <Col className="col-9">
          <span>Description: </span>
          <span>{movie.description}</span>
        </Col>
        <Col>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </Col>
        <Col>
          <span>Director: </span>
          <span>{movie.director}</span>
        </Col>
      </Row>
      <Row classname="d-flex">
        <Col>
          <Link to={`/`}>
            <button className="close-button float-end">Close</button>
          </Link>
        </Col>
      </Row>
    </Container>
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
