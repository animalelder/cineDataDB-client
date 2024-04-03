import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const SimilarMovies = ({ movieid, movies, genreSim }) => {
  const genreMovies = movies.filter((m) => {
    if (m.genre === genreSim && m.id !== movieid) {
      return m;
    }
  });

  if (genreMovies.length > 6) {
    genreMovies.length = 6;
  }

  return (
    <Row>
      <Col>
        <h3>Similar Movies</h3>
      </Col>
      <Row>
        {genreMovies.map((movie) => {
          return (
            <Col className="mt-5" key={movie.id} xs={6} xl={4}>
              <Link to={`/movies/${movie.id}`} />

              <MovieCard movie={movie} />
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};
