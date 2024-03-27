import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://cine-data-db-04361cdbefbe.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        console.error('Login error: ', e);
        alert('Something went wrong');
      });
  };
  return (
    <Row className="justify-content-center">
      <Col md={6} xl={4}>
        <Card className="m-5">
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>Log into Your Account</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mt-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-3">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Row className="justify-content-end m-2">
                <Button className="w-50" variant="success" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

// return (
//   <form onSubmit={handleSubmit}>
//     <label>
//       Username:
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//     </label>
//     <label>
//       Password:
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//     </label>
//     <button type="submit">Submit</button>
//   </form>
// );
