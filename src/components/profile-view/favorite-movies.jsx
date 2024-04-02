import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Row>
      <Col md={12}>
        <h3>My Favorite Movies</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.id} xs={12} sm={6} lg={4}>
              <Link to={`/movies/${movie.id}`} />
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies.includes(movie.id)}
              />
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};
