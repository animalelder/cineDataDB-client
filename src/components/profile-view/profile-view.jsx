import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ localUser, movies, token }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.username);
  const [email, setEmail] = useState(storedUser.email);
  const [password, setPassword] = useState();
  const [birthdate, setBirthdate] = useState();
  const [user, setUser] = useState();
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
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cine-data-db-04361cdbefbe.herokuapp.com/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Users data: ", data);
        const usersFromApi = data.map((queryUser) => {
          return {
            id: queryUser._id,
            username: queryUser.username,
            password: queryUser.password,
            email: queryUser.email,
            birthdate: queryUser.birthdate,
            favoriteMovies: queryUser.favoriteMovies,
          };
        });
        setUser(usersFromApi.find((u) => u.username === localUser.username));
        //   localStorage.setItem('user', JSON.stringify(user));
        console.log("Profile Saved User: " + JSON.stringify(user));
        //   console.log("User Result Data: " + storedUser.username );
        //   storedUser = user;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <Container className="mx-auto">
      <Row>
        <Card className="mb-5">
          <Card.Body>
            <Card.Title>My Profile </Card.Title>
            <Card.Text>
              {user && <UserInfo name={user.username} email={user.email} />}
            </Card.Text>
          </Card.Body>
        </Card>
        <Row>
          <Col className="px-5 mb-5">
            {favoriteMovies && (
              <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
            )}
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto mb-5" xs={12} sm={6} md={8}>
            <Card className="mb-5">
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
      </Row>
    </Container>
  );
};
