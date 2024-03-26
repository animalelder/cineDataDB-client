import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';

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
            imagePath: movie.imagePath,
            featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <Placeholder className="mx-auto w-50" as="span" animation="glow">
            <Placeholder md={12} bg="success" />
          </Placeholder>
          <SignupView />
        </>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onCloseClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                className="h-100"
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setUser(null);
            }}>
            Logout 😵
          </Button>
        </>
      )}
    </Row>
  );
};

// if (!user) {
//   return (
//       <Row className="justify-content-center">
//           <LoginView
//             onLoggedIn={(user, token) => {
//               setUser(user);
//               setToken(token);
//             }}
//           />
//         <Placeholder className="mx-auto w-50" as="span" animation="glow">
//           <Placeholder md={12} bg="success" />
//         </Placeholder>
//           <SignupView />
//       </Row>
//   );
// }

// if (selectedMovie) {
//   return (
//     <MovieView
//       movie={selectedMovie}
//       onCloseClick={() => setSelectedMovie(null)}
//     />
//   );
// }

// return (
//   <>
//     <div>
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.id}
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       ))}
//     </div>

//   </>
// );
