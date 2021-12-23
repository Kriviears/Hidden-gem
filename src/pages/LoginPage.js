import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

import "./LoginPage.css";

const LoginPage = () => {
  // States for individual registration

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Start handling functions:

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
    if ( email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }

    let dataObject = {
      email: email,
      password: password
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
        <h1> You're logged In!</h1>
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
        <h1>Darn! Something went wrong!</h1>
      </div>
    );
  };

  //  JSX ***  *** *** JSX *** *** *** JSX  ***/
  return (
    <div className="login_form">
      <div>
        <h2>Login</h2>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}

        <label id="top_login" className="login_label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
          required
        />

        <label className="login_label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
          required
        />

        <Button onClick={handleSubmit} bg="secondary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;