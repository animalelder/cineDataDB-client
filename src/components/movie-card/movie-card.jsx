import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [isFav, setIsFav] = useState(isFavorite);
  //const [addFav, setAddFav] = useState("");
  //const [unFav, setUnFav] = useState("");
  // const imagePath = movie.imagePath;

  useEffect(() => {
    setIsFav(user.favoriteMovies.includes(movie.id));
  }, [isFav, user]);

  const handleAddToFavorites = () => {
    addToFavorites(movie.id);
  };
  const handleRemoveFromFavorites = () => {
    removeFromFavorites(movie.id);
  };

  const addToFavorites = () => {
    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${
        user.username
      }/favorites/${encodeURIComponent(movie.id)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          alert("Oops!");
          throw new Error("Failed to add movie to favorites.");
        }
        // alert("Movie added to favorites successfully!");
        //window.location.reload();
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
    //return setIsFav(true);
  };

  const removeFromFavorites = () => {
    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${
        user.username
      }/favorites/${encodeURIComponent(movie.id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        // alert("Movie removed from favorites successfully!");
        //window.location.reload();
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
    //return setIsFav(false);
  };

  return (
    <Card
      border="light"
      className="bg-secondary card-container shadow-lg h-100"
    >
      <Card.Body>
        <Card.Img
          alt="movie poster"
          className="card-img"
          src={movie.imagePath}
        />

        <div id="title" className="d-grid text-center">
          <Badge bg="secondary" size="sm" className="mt-1 movie-title">
            {movie.title}
          </Badge>
        </div>
        {/* <Card.Text as="span" className="align-bottom"></Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <Stack
          direction="horizontal"
          className="buttons d-flex justify-content-between align-self-end align-items-end text-uppercase"
          gap={1}
        >
          <Badge
            bg="secondary"
            className="me-auto py-1 align-self-end text-light"
          >
            {movie.genre}
          </Badge>

          {isFav ? (
            <Button
              variant="outline-danger"
              size="sm"
              className="bg-light text-danger ms-auto"
              onClick={handleRemoveFromFavorites}
            >
              <i id="favorited" className="bi bi-heart-fill" />
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              size="sm"
              className="text-danger bg-light ms-auto"
              onClick={handleAddToFavorites}
            >
              <i className="bi bi-heart" />
            </Button>
          )}
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button
              variant="outline-secondary"
              className="bg-info text-light"
              size="sm"
            >
              <i className="bi bi-info-square-fill" />
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
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
};
