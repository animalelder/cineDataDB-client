import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CloseButton from "react-bootstrap/CloseButton";
import { SimilarMovies } from "./similar-movies";
import { ScrollTop } from "../navigation-bar/scroll-top";
import { useNavigate } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <Container fluid>
      <Card className="movie-details bg-secondary mb-5 p-2">
        <Row className="d-grid align-self-end">
          <Button
            size="sm"
            className="float-end close-button"
            role="navigation"
            onClick={() => navigate(-1)}
          >
            GO BACK
          </Button>
        </Row>
        <Row className="mx-auto">
          <Col className="text-center">
            <Image
              fluid
              className="detail-img"
              src={movie.imagePath}
              alt={`movie poster for ${movie.title}`}
            />
          </Col>
          <Col xs={12} lg={6} className="d-grid">
            <Row className="align-items-start text-center">
              <h2 className="movie-title">{movie.title}</h2>
            </Row>

            <Row className="align-middle">
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
        <Card className="bg-info bg-opacity-75 mx-auto similar-movies">
          <Card.Header className="bg-primary text-center">
            Similar Movies
          </Card.Header>
          <Card.Body>
            <ScrollTop />
            <SimilarMovies
              movieid={movie.id}
              movies={movies}
              genreSim={movie.genre}
            />
          </Card.Body>
        </Card>
      </Card>
    </Container>
  );
};
