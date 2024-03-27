import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthDate: birthday,
    };

    fetch('https://cine-data-db-04361cdbefbe.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Row className="justify-content-center">
      <Col md={6} xl={4}>
        <Card className="m-5">
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title>Create an Account</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="signUpFormUsername">
                <FloatingLabel
                  controlId="formUsername"
                  label="Username"
                  className="mb-3">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="signUpFormPassword">
                <FloatingLabel
                  controlId="formPassword"
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
              <Form.Group controlId="signUpFormEmail">
                <FloatingLabel
                  controlId="formEmail"
                  label="Email Address"
                  className="mb-3">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="signUpFormBirthday">
                <FloatingLabel
                  controlId="formBirthday"
                  label="Date of Birth"
                  className="mb-3">
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Row className="justify-content-end m-2">
                <Button className="w-50" variant="primary" type="submit">
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
//         minLength="5"
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
//     <label>
//       Email:
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//     </label>
//     <label>
//       Birthday:
//       <input
//         type="date"
//         value={birthday}
//         onChange={(e) => setBirthday(e.target.value)}
//         required
//       />
//     </label>
//     <button type="submit">Submit</button>
//   </form>
// );
