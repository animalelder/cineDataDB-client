import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Row>
      <Col>
        <h3>My Favorite Movies</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.id} xs={6} md={4} xl={3}>
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
