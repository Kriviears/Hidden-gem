import React, { useState } from "react";
import { NavLink, Form, Col, Button } from "react-bootstrap";
import "./RegisterPage.css";

const RegisterPage = () => {
  // States for individual registration
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  // const [whichState, setwhichState] = useState("");
  const [isMatched, setIsMatched] = useState(false);

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

  // const handleWhichState = (e) => {
  //   setwhichState(e.target.value);
  //   setSubmitted(false);
  // };

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
      password !== confirmPassword
      // (whichState === "")
    ) {
      setError(true);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        console.log(password, confirmPassword);
      } else {
        setSubmitted(true);
        setError(false);
      }
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
      // whichState: whichState,
    };
    console.log(dataObject);
  };

  //funtion to validate and prevent submission:
  const validateForm = () => {
    return (
      fullName.length > 0 &&
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
        className="success"
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
          className="error"
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
          className="error"
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
        <Form.Group as={Col}>
          <Form.Label className="reg_label">Full Name</Form.Label>
          <Form.Control
            onChange={handleFullName}
            className="input"
            value={fullName}
            name="fullName"
            type="text"
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="reg_label">User Name</Form.Label>
          <Form.Control
            onChange={handleUserName}
            className="input"
            name="userName"
            value={userName}
            type="text"
            required
          />
        </Form.Group>

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

        <Form.Group as={Col}>
          <label className="reg_label">Confirm Password</label>
          <input
            onChange={handleConfirmPassword}
            className="input"
            value={confirmPassword}
            type="password"
            required
          />
        </Form.Group>

        <Form.Group as={Col}>
          <label className="reg_label">City</label>
          <input
            onChange={handleCity}
            className="input"
            value={city}
            type="text"
            required
          />
        </Form.Group>

        {/* <label className="reg_label">State</label>
        <input
          onChange={handleWhichState}
          className="input"
          value={whichState}
          type="text"
          required
        /> */}

        <form>
          <fieldset>
            <label for="state">State</label>
            <select id="state" name="state">
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
              <option value="Guam">Guam</option>
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
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Virgin Islands">Virgin Islands</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          </fieldset>

          <Button
            onClick={handleSubmit}
            bg="secondary"
            type="submit"
            disabled={!validateForm()}
          >
            Submit
          </Button>
        </form>

        <NavLink
          style={{ cursor: "pointer" }}
          onClick={() => console.log("Link to Login Page")}
        >
          Have an account? Log in
        </NavLink>
      </form>
    </div>
  );
};

export default RegisterPage;