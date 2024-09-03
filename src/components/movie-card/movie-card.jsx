import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Stack, Badge } from "react-bootstrap";

export const MovieCard = ({ movie, isFavorite }) => {
  //const [token, setToken] = useState(storedToken ? storedToken : null);
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [isFav, setIsFav] = useState(isFavorite);

  const addToFavorites = () => {
    fetch(
      `https://cinedata-movie-api.onrender.com/users/${
        user.username
      }/favorites/${encodeURIComponent(movie.id)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          alert("Oops!");
          throw new Error("Failed to add movie to favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFromFavorites = () => {
    fetch(
      `https://cinedata-movie-api.onrender.com/users/${
        user.username
      }/favorites/${encodeURIComponent(movie.id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setIsFav(user.favoriteMovies.includes(movie.id));
  }, [isFav, user]);

  const handleAddToFavorites = () => {
    addToFavorites(movie.id);
    setIsFav(!isFav);
  };
  const handleRemoveFromFavorites = () => {
    removeFromFavorites(movie.id);
    setIsFav(!isFav);
  };

  return (
    <Card
      border="light"
      className="shadow-lg movie-card bg-secondary card-container h-100"
    >
      <Card.Body>
        <Card.Img
          alt={`movie poster for ${movie.title}`}
          className="card-img"
          src={movie.imagePath}
        />

        <div className="text-center d-grid">
          <span className="mt-1 movie-card-title">{movie.title}</span>
        </div>
        {/* <Card.Text as="span" className="align-bottom"></Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <Stack
          direction="horizontal"
          className="buttons d-flex justify-content-between align-self-end align-items-end text-uppercase"
          gap={1}
        >
          <Badge bg="primary" className="p-2 me-auto align-self-end text-light">
            {movie.genre}
          </Badge>

          {isFav ? (
            <Button
              variant="light"
              size="sm"
              className="ms-auto"
              onClick={handleRemoveFromFavorites}
            >
              ♥️
            </Button>
          ) : (
            <Button
              variant="light"
              size="sm"
              id="card-btn-none"
              className="card-btn-none ms-auto"
              onClick={handleAddToFavorites}
            >
              ✔️
            </Button>
          )}
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="light" size="sm">
              ℹ️
            </Button>
          </Link>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
};
