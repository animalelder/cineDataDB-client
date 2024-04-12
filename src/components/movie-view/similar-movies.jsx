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
      {genreMovies.map((movie) => {
        return (
          <Col
            className="mb-2 bg-opacity-75 text-center"
            key={movie.id}
            xs={12}
            sm={6}
          >
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};
