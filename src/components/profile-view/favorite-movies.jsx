import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Container>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-2" key={movie.id} xs={12} sm={6} lg={4} xl={3}>
              <Link to={`/movies/${movie.id}`} />
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies.includes(movie.id)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
