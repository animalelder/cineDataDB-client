// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export const MovieView = ({ movie, onCloseClick }) => {
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
          <button className="close-button float-end" onClick={onCloseClick}>
            Close
          </button>
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
