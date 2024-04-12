import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export const UpdateUser = ({
  formData,
  handleUpdate,
  handleSubmit,
  handleDeleteAccount,
}) => {
  return (
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
              onChange={(e) => handleUpdate(e)}
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
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleUpdate(e)}
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
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleUpdate(e)}
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
              value={formData.birthdate}
              placeholder="1999/12/25"
              onChange={(e) => handleUpdate(e)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Button className="mb-2" variant="light" type="submit">
            UPDATE INFO
          </Button>
          <Button onClick={() => handleDeleteAccount()} variant="danger">
            DELETE ACCOUNT
          </Button>
        </Row>
      </Form>
    </Row>
  );
};
