import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <Container className='movie-poster'>
      <Row>
        <Col className='text-center'>
          <Image fluid src={movie.imagePath} alt='Movie poster' />
        </Col>
      </Row>
      <Row>
        <h1>{movie.title}</h1>
      </Row>
      <Row>
        <Col className='col-9'>
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
      <Row classname='d-flex'>
        <Col>
          <Link to={`/`}>
            <button className='close-button float-end'>Close</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
