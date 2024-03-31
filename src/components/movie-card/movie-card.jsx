import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addFav, setAddFav] = useState('');
  const [unFav, setUnFav] = useState('');

  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${
          user.username
        }/favorites/${encodeURIComponent(movie.id)}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            alert('Oops!');
            throw new Error('Failed to add movie to favorites.');
          }
          alert('Movie added to favorites successfully!');
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const removeFromFavorites = () => {
      fetch(
        `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${
          user.username
        }/favorites/${encodeURIComponent(movie.id)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to remove movie from favorites.');
          }
          alert('Movie removed from favorites successfully!');
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (addFav) {
      addToFavorites();
    }
    if (unFav) {
      removeFromFavorites();
    }
  }, [addFav, unFav, token]);

  const handleAddToFavorites = () => {
    setAddFav(movie.id);
  };
  const handleRemoveFromFavorites = () => {
    setUnFav(movie.id);
  };

  return (
    <Card className='border-primary shadow-lg h-100'>
      <Card.Body>
        <Card.Img alt='movie poster' src={movie.imagePath} />
        <Card.Title as='h6' className='mt-1 text-center'>
          {movie.title}
        </Card.Title>
        <Card.Text>
          <Stack
            direction='horizontal'
            className='d-flex justify-content-between text-uppercase'
            gap={1}
          >
            <Badge bg='primary' className='px-2 py-1 align-self-end'>
              {movie.genre}
            </Badge>

            {isFavorite ? (
              <Button
                variant='danger'
                size='sm'
                className='text-light ms-auto'
                onClick={handleRemoveFromFavorites}
              >
                <i class='bi bi-heart-fill' />
              </Button>
            ) : (
              <Button
                variant='light'
                size='sm'
                className='text-danger ms-auto'
                onClick={handleAddToFavorites}
              >
                <i class='bi bi-heart-fill' />
              </Button>
            )}
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button size='sm' variant='info'>
                <i class='bi bi-info-square-fill' />
              </Button>
            </Link>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string,
      death: PropTypes.string,
    }),
    Featured: PropTypes.bool,
  }).isRequired,
};
