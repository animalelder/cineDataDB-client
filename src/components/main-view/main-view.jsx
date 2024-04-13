import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { debounce } from "lodash";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    fetch("https://cine-data-db-04361cdbefbe.herokuapp.com/movies", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error fetching movies.", response);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre.name,
            director: movie.director.name,
            imagePath: movie.imagePath,
            featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
        console.log("Set movies.");
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((searchTerm) => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredMovies(filteredMovies);
  }, 300);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center mx-3">
        <Routes>
          <Route
            path="/signup"
            element={
              <Container fluid>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <>
                    <SignupView />
                  </>
                )}
              </Container>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Row>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies to display!</Col>
                ) : (
                  <MovieView movies={movies} />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Container className="w-100 text-center">
                      {/* <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search the films on cineData..."
                        className="searchBar"
                      /> */}
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          value={searchTerm}
                          onChange={handleSearch}
                          placeholder="Search the films on cineData..."
                          className="searchBar"
                          aria-label="Search"
                        />
                      </Form>
                    </Container>
                    {filteredMovies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie.id}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={3}
                      >
                        <MovieCard
                          movie={movie}
                          isFavorite={user.favoriteMovies.includes(movie.id)}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      localUser={user}
                      movies={movies}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
