import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ localUser, movies, token }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.username);
  const [email, setEmail] = useState(storedUser.email);
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(storedUser.birthdate);
  const [user, setUser] = useState(localUser);
  const favoriteMovies =
    user === undefined
      ? []
      : movies.filter((m) => user.favoriteMovies.includes(m.id));

  const formData = {
    username: username,
    email: email,
    birthdate: birthdate,
    password: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault(event);
    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${user.username}`,
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

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "date":
        setBirthdate(e.target.value);
      default:
    }
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

  useEffect(() => {
    if (token) {
      return;
    }

    fetch(
      `https://cine-data-db-04361cdbefbe.herokuapp.com/users/${storedUser.username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        //   localStorage.setItem('user', JSON.stringify(user));
        console.log("Profile Saved User: " + JSON.stringify(data));
        //   console.log("User Result Data: " + storedUser.username );
        //   storedUser = user;
        console.log(user.birthdate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

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
              <UpdateUser
                formData={formData}
                handleUpdate={handleUpdate}
                handleSubmit={handleSubmit}
                handleDeleteAccount={handleDeleteAccount}
              />
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
