import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { setAuthToken } from "../utils/axiosConfig";
import { Form, Col, Button } from "react-bootstrap";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const { login } = useProvideAuth();
  const navigate = useNavigate();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      setAuthToken(res.token);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className={classes.success}
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h2>You're logged in</h2>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className={classes.error}
        style={{
          display: error ? "" : "none",
        }}
      >
        <h2>Darn! Something went wrong!</h2>
      </div>
    );
  };

  //Backend Errors for TOAST MESSAGE:

  //  JSX ***  *** *** JSX *** *** *** JSX  ***/
  return (
    <div className={classes.form}>
      <div>
        <h2 className={classes.title}>Sign In To Hidden Gems</h2>
      </div>

      {/* Calling to the methods */}
      <div className={classes.messages}>
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <Form.Group as={Col}>
          <Form.Label className={classes.label}>Email</Form.Label>
          <Form.Control
            onChange={handleEmail}
            className={classes.input}
            value={email}
            type="email"
            required
          />

          <Form.Label className={classes.label}>Password</Form.Label>
          <Form.Control
            onChange={handlePassword}
            className={classes.input}
            value={password}
            type="password"
            required
          />
        </Form.Group>
      </form>
      <Button
        className={classes.signupsButtons}
        style={{ marginTop: "10px", width: "300px" }}
        onClick={handleSubmit}
        bg="secondary"
        type="submit"
        style={{backgroundColor: "rgb(16, 16, 75)"}}
        disabled={!validateForm()}
      >
        Sign In
      </Button>
      <Link to="/register">
        <p className={classes.link}>No account? Sign Up!</p>
      </Link>
    </div>
  );
};

export default LoginPage;
