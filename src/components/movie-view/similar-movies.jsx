import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";

export const SimilarMovies = ({ movieid, movies, genreSim }) => {
  const genreMovies = movies.filter((m) => {
    if (m.genre === genreSim && m.id !== movieid) {
      return m;
    }
  });

  if (genreMovies.length > 10) {
    genreMovies.length = 10;
  }

  return (
    <Row className="d-flex justify-content-evenly">
      {genreMovies.map((movie) => {
        return (
          <Col
            className="sim-card mb-2 bg-opacity-75 text-center"
            key={movie.id}
            xs={12}
            sm={6}
            lg={4}
            xl={3}
          >
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};
