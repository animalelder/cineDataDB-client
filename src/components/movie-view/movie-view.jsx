import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CloseButton from 'react-bootstrap/CloseButton';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <Container fluid className='movie-poster'>
      <Row>
        <Link to={`/`}>
          <CloseButton className='float-end' />
        </Link>
        <Col className='text-center'>
          <Image
            fluid
            className='detail-img'
            src={movie.imagePath}
            alt='Movie poster'
          />
        </Col>
        <Col className='d-grid'>
          <Row className='align-items-start text-center'>
            <h1>{movie.title}</h1>
          </Row>

          <Row className='align-content-around'>
            <dl>
              <dt>Description: </dt>
              <dd>{movie.description}</dd>
              <dt>Genre: </dt>
              <dd>{movie.genre}</dd>
              <dt>Director: </dt>
              <dd>{movie.director}</dd>
            </dl>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
