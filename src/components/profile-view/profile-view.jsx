import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ localUser, movies, userToken }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(localUser);
  const favoriteMovies =
    user === undefined
      ? []
      : movies.filter((m) => user.favoriteMovies.includes(m.id));

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    birthdate: user.birthdate,
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault(event);
    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${storedUser.username}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          window.location.reload();

          return response.json();
        }
        alert("Update failed");
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteAccount = () => {
    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${storedUser.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    ).then((response) => {
      if (response.ok) {
        alert("Account deleted successfully.");
        setUser(null);
        setToken(null);
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  // useEffect(() => {
  //   if (token) {
  //     return;
  //   }

  //   fetch(
  //     `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${user.username}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //       //   localStorage.setItem('user', JSON.stringify(user));
  //       console.log("Profile Saved User: " + JSON.stringify(data));
  //       //   console.log("User Result Data: " + storedUser.username );
  //       //   storedUser = user;
  //       console.log(user.birthdate);
  //     })
  //     .catch((error) => {
  //       console.error("There was a mistake.");
  //     });
  // }, [user, token]);

  return (
    <Container className="mx-auto">
      <Row className="text-center">
        <Col xs={12} md={6} className="mx-auto">
          <Card className=" m-4">
            <Card.Header as="h3" className="bg-primary text-center">
              Hi, {user.username}!
            </Card.Header>
            <Card.Body>
              {user && <UserInfo name={user.username} email={user.email} />}
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-auto mb-5" xs={12} md={6}>
          <Card className="mb-5">
            <Card.Header as="h3" className="bg-primary text-center">
              Update Account
            </Card.Header>
            <Card.Body>
              <Row>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="updateFormUsername">
                    <FloatingLabel
                      controlId="formUsername"
                      label="Change Username"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        value={formData.username}
                        placeholder="Username"
                        label="Change Username"
                        name="username-field"
                        onChange={(e) =>
                          setFormData((prevUser) => ({
                            ...prevUser,
                            username: e.target.value,
                          }))
                        }
                        required
                        minLength="5"
                      />
                      <Form.Text id="usernameHelpBlock" muted>
                        Username must be at least 5 characters.
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group controlId="signUpFormPassword">
                    <FloatingLabel
                      controlId="formPassword"
                      label="Change Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        label="Change Password"
                        placeholder="Password"
                        value={formData.password}
                        name="password-field"
                        onChange={(e) =>
                          setFormData((prevUser) => ({
                            ...prevUser,
                            password: e.target.value,
                          }))
                        }
                        required
                      />
                      <Form.Text id="passwordHelpBlock" muted>
                        Enter current password or set a new password.
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group controlId="updateFormEmail">
                    <FloatingLabel
                      controlId="formEmail"
                      label="Change Email Address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        label="Change Email Address"
                        placeholder="name@example.com"
                        name="email-field"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prevUser) => ({
                            ...prevUser,
                            email: e.target.value,
                          }))
                        }
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group controlId="updateFormBirthday">
                    <FloatingLabel
                      controlId="formBirthday"
                      label="Date of Birth"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        label="Date of Birth"
                        value={formData.birthdate}
                        name="user-birthdate"
                        placeholder="1999-03-14"
                        onChange={(e) =>
                          setFormData((prevUser) => ({
                            ...prevUser,
                            birthdate: e.target.value,
                          }))
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Row>
                    <Button className="mb-2" variant="light" type="submit">
                      UPDATE INFO
                    </Button>
                    <Button
                      onClick={() => handleDeleteAccount()}
                      variant="danger"
                    >
                      DELETE ACCOUNT
                    </Button>
                  </Row>
                </Form>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mb-3 bg-info bg-opacity-75 text-center">
        <Card.Header className="bg-primary mb-2" as="h2">
          My Favorite Movies
        </Card.Header>
        <Col className=" mb-1 p-2">
          {favoriteMovies && (
            <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
          )}
        </Col>
      </Card>
      <Row></Row>
    </Container>
  );
};
