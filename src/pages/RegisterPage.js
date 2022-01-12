import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { setAuthToken } from "../utils/axiosConfig";

import { Form, Col, Button } from "react-bootstrap";
import classes from "./RegisterPage.module.css";

const RegisterPage = () => {
  // States for individual registration
  const navigate = useNavigate();
  // const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const { signup } = useProvideAuth();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Start handling functions:
  // const handleFullName = (e) => {
  //   setUserName(e.target.value);
  //   setSubmitted(false);
  // };
  
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



  // FUNCTION Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      // fullName === "" ||
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
  
    ) {
      setError(true);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        setSubmitted(true);
        setError(false);
      }
    }

    try {
      const res = await signup(userName, email, password);
      setAuthToken(res.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  //funtion to validate and prevent submission:
  const validateForm = () => {
    return (
      // fullName.length > 0 &&
      email.length > 0 &&
      userName.length &&
      password.length > 5 &&
      confirmPassword.length > 5
    );
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
        <h3>{userName} has successfully registered!</h3>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    if (password !== confirmPassword) {
      return (
        <div
          className={classes.error}
          style={{
            display: error ? "" : "none",
          }}
        >
          <h2>Passwords don't match</h2>
        </div>
      );
    } 
  };

  //error message and error found
  //set error message to true 


  //  JSX ***  *** *** JSX *** *** *** JSX  ***/
  return (
    <div className={classes.form}>
      <h2 className={classes.title}>Sign Up For Hidden Gems</h2>

      {/* Calling to the methods */}
      <div className={classes.messages}>
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <Form.Group as={Col}>

          {/* <Form.Label className={classes.label}>Full Name</Form.Label>
          <Form.Control
            onChange={handleFullName}
            className={classes.input}
            value={fullName}
            name="fullName"
            type="text"
            required
          /> */}

          <Form.Label className={classes.label}>User Name</Form.Label>
          <Form.Control
            onChange={handleUserName}
            className={classes.input}
            name="userName"
            value={userName}
            type="text"
            required
          />

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
            placeholder="At least 8 characters "
            className={classes.input}
            value={password}
            type="password"
            required
          />

          <Form.Label className={classes.label}>Confirm Password</Form.Label>
          <Form.Control
            onChange={handleConfirmPassword}
            className={classes.input}
            value={confirmPassword}
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
        Submit
      </Button>
      <Link to="/login">
        <p className={classes.link}>Have an account? Log in</p>
      </Link>
    </div>
  );
};

export default RegisterPage;
