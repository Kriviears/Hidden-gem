import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { setAuthToken } from "../utils/axiosConfig";

import { Form, Col, Button } from "react-bootstrap";
import classes from "./RegisterPage.module.css";

const RegisterPage = () => {
  // States for individual registration
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [city, setCity] = useState("");

  const { signup } = useProvideAuth();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //Start handling functions:
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

  // const handleCity = (e) => {
  //   setCity(e.target.value);
  //   setSubmitted(false);
  // };

  // const handleWhichState = (e) => {
  //   setwhichState(e.target.value);
  //   setSubmitted(false);
  // };

  // FUNCTION Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
      // (whichState === "")
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
      // navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  //funtion to validate and prevent submission:
  const validateForm = () => {
    return (
      email.length > 0 &&
      userName.length &&
      password.length > 5 &&
      confirmPassword.length > 5
    );
  };

  //FIXME:  NEED TRY CATCH

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
          <h2>Pass words dont match</h2>
        </div>
      );
    } else {
      return (
        <div
          className={classes.error}
          style={{
            display: error ? "" : "none",
          }}
        >
          <h1>Please enter all the fields</h1>
        </div>
      );
    }
  };

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

          {/* <Form.Label className={classes.label}>City</Form.Label>
          <Form.Control
            onChange={handleCity}
            className={classes.input}
            value={city}
            type="text"
            required
          />

          <fieldset>
            <Form.Label className={classes.label} for="state">
              State
            </Form.Label>
            <select className={classes.input} id="state" name="state">
              <option value="---">---</option>
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District of Columbia">District of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          </fieldset> */}
        </Form.Group>
      </form>
      <Button
        style={{ marginTop: "10px", width: "300px" }}
        onClick={handleSubmit}
        bg="secondary"
        type="submit"
        disabled={!validateForm()}
      >
        Submit
      </Button>
      <Link to="/login">
        <p>Have an account? Log in</p>
      </Link>
    </div>
  );
};

export default RegisterPage;
