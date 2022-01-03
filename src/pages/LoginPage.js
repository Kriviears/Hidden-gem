import React, { useState } from "react";
import { Form, Col, Button, NavLink } from "react-bootstrap";

import "./LoginPage.css";

const LoginPage = () => {
  // States for individual registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Start handling functions:
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // FUNCTION Handling the submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }

    let dataObject = {
      email: email,
      password: password,
    };
    console.log(dataObject);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="login_success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h2> You're logged in</h2>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h2>Darn! Something went wrong!</h2>
      </div>
    );
  };

  //  JSX ***  *** *** JSX *** *** *** JSX  ***/
  return (
    <div className="login_form">
      <div>
        <h2>Sign In</h2>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <Form.Group as={Col}>
          <Form.Label className="reg_label">Email</Form.Label>
          <Form.Control
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="reg_label">Password</Form.Label>
          <Form.Control
            onChange={handlePassword}
            placeholder="At least 8 characters "
            className="input"
            value={password}
            type="password"
            required
          />
        </Form.Group>

        <Button
          onClick={handleSubmit}
          bg="secondary"
          type="submit"
          disabled={!validateForm()}
        >
          Sign In
        </Button>
      </form>

      <NavLink
        style={{ cursor: "pointer" }}
        onClick={() => console.log("Link to register")}
      >
        No account? Sign Up!
      </NavLink>
    </div>
  );
};

export default LoginPage;