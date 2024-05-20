import { useState } from 'react';
import { Form, Button, Row, Col, Card, FloatingLabel } from 'react-bootstrap';

const registerUser = async (formData) => {
  try {
    const SignUpURL = 'https://cinedata-movie-api.onrender.com/users';
    const response = await fetch(SignUpURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 422) {
      throw new Error(data.errors.map((err) => err.msg).join(', '));
    } else if (response.status === 201) {
      return data;
    } else if (response.status === 500) {
      throw new Error(data.message || 'Server error. Please try again later.');
    }
  } catch (error) {
    throw error;
  }
};

export const SignupView = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthdate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      registerUser(formData);
      alert('Signup successful');
      window.location.reload();
    } catch (error) {
      alert('Sign up failed...try again later.');
    }
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={8} xl={6}>
        <Card className='m-2'>
          <Card.Body className='d-flex flex-column align-items-center'>
            <Card.Title>Create an Account</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='signUpFormUsername'>
                <FloatingLabel
                  controlId='formUsername'
                  label='Username'
                  className='mb-3'
                >
                  <Form.Control
                    type='text'
                    value={formData.username}
                    placeholder='Username'
                    name='username'
                    autoFocus
                    onChange={handleChange}
                    required
                    minLength='5'
                  />
                  <Form.Text id='usernameHelpBlock' muted>
                    Username must be at least 5 characters.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId='signUpFormPassword'>
                <FloatingLabel
                  controlId='formPassword'
                  label='Password'
                  className='mb-3'
                >
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text id='passwordHelpBlock' muted>
                    No spaces or special characters.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId='signUpFormEmail'>
                <FloatingLabel
                  controlId='formEmail'
                  label='Email Address'
                  className='mb-3'
                >
                  <Form.Control
                    type='email'
                    placeholder='name@example.com'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId='signUpFormBirthday'>
                <FloatingLabel
                  controlId='formBirthday'
                  label='Date of Birth'
                  className='mb-3'
                >
                  <Form.Control
                    type='date'
                    value={formData.birthdate}
                    placeholder='12/25/1999'
                    name='birthdate'
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Row className='justify-content-end m-2'>
                <Button className='w-50' variant='success' type='submit'>
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
