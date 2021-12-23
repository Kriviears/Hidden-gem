import React, { useState } from "react";
import { Dropdown, Button, Toast } from "react-bootstrap";

import "./RegisterPage.css";

const RegisterPage = () => {
  // States for individual registration
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [whichState, setwhichState] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Start handling functions:
  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);

    setSubmitted(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handleWhichState = (e) => {
    setwhichState(e.target.value);
    setSubmitted(false);
  };

  // FUNCTION Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      city === "" ||
      (whichState === "" && password === confirmPassword)
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setSubmitted(false);
    }

    //TOAST else?? {
    //toast.error("Password Does Not Match");

    let dataObject = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      city: city,
      whichState: whichState,
    };
    console.log(dataObject);
  };

  //FIXME:  NEED TRY CATCH

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {userName} successfully registered!</h1>
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  //  JSX ***  *** *** JSX *** *** *** JSX  ***/
  return (
    <div className="reg_form">
      <div>
        <h2>Sign Up</h2>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}

        <label className="reg_label">Full Name</label>
        <input
          onChange={handleFullName}
          className="input"
          value={fullName}
          name="fullName"
          type="text"
          required
        />

        <label className="reg_label">User Name</label>
        <input
          onChange={handleUserName}
          className="input"
          name="userName"
          value={userName}
          type="text"
          required
        />

        <label className="reg_label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
          required
        />

        <label className="reg_label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
          required
        />

        <label className="reg_label">Confirm Password</label>
        <input
          onChange={handleConfirmPassword}
          className="input"
          value={confirmPassword}
          type="password"
          required
        />

        <label className="reg_label">City</label>
        <input
          onChange={handleCity}
          className="input"
          value={city}
          type="text"
          required
        />

        <label className="reg_label">State</label>
        <input
          onChange={handleWhichState}
          className="input"
          value={whichState}
          type="text"
          required
        />

        <Button onClick={handleSubmit} bg="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
