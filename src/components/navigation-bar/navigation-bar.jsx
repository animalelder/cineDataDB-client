import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logoImage from "../img/triangle.svg";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      className="bg-primary text-light mb-2"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src={logoImage} className="p-0 m-0" />
          cineData
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  See All of the Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link className="highlight" onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
