import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://cine-data-db-04361cdbefbe.herokuapp.com/movies', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre.name,
            director: movie.director.name,
            imagePath: movie.imagePath,
            featured: movie.featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <div>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
        </div>
        or
        <div>
          <SignupView />
        </div>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onCloseClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setUser(null);
        }}>
        Logout 😵
      </button>
    </>
  );
};
