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
    <Card border="light" className="bg-primary card-container shadow-lg h-100">
      <Card.Body>
        <Card.Img
          alt="movie poster"
          className="card-img"
          src={movie.imagePath}
        />
        <Card.Title className="text-center text-light movie-title">
          {movie.title}
        </Card.Title>
        <Card.Text as="span" className="align-bottom"></Card.Text>
        <Stack
          direction="horizontal"
          className="buttons d-flex justify-content-between align-self-end align-items-end text-uppercase"
          gap={1}
        >
          <Badge bg="success" className="px-2 py-2 me-auto align-self-end">
            {movie.genre}
          </Badge>

          {isFav ? (
            <Button
              variant="dark"
              size="sm"
              className="bg-dark text-danger ms-auto"
              onClick={handleRemoveFromFavorites}
            >
              <i id="favorited" className="bi bi-heart-fill" />
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              className="text-danger bg-light ms-auto"
              onClick={handleAddToFavorites}
            >
              <i className="bi bi-heart" />
            </Button>
          )}
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="bg-warning" size="sm" variant="info">
              <i className="bi bi-info-square-fill" />
            </Button>
          </Link>
        </Stack>
      </Card.Body>
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
