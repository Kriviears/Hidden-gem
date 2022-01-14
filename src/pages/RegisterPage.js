import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { setAuthToken } from "../utils/axiosConfig";
import { toast } from "react-toastify";
import classes from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup } = useProvideAuth();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // FUNCTION Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
      toast.error("See password requirements");
      return;
    }
    try {
      const res = await signup(userName, email, password);
      setAuthToken(res.token);
      toast.success(`Welcome ${userName}`);
      navigate("/");
    } catch (error) {
      toast.error("Email or username in use");
    }
  };

  return (
    <div className={classes.form}>
      <h2 className={classes.title}>Sign Up For Hidden Gems</h2>

      <form className={classes.form}>
        <input
          onChange={handleUserName}
          className={classes.input}
          name="userName"
          placeholder="Username"
          value={userName}
          type="text"
          required
        />
        <input
          onChange={handleEmail}
          className={classes.input}
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <input
          onChange={handlePassword}
          placeholder="Password"
          className={classes.input}
          value={password}
          type="password"
          required
        />
        <input
          onChange={handleConfirmPassword}
          className={classes.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          type="password"
          required
        />
      </form>
      <button
        className={classes.btn}
        style={{ marginTop: "10px", width: "300px" }}
        onClick={handleSubmit}
        bg="secondary"
        type="submit"
      >
        Submit
      </button>
      <Link to="/login">
        <p className={classes.link}>Have an account? Log in</p>
      </Link>
      <p className={classes.subtext}>
        Your password must be at least 8 charaters long and contain at least one
        lower case, one upper case, and one digit.
      </p>
    </div>
  );
};

export default RegisterPage;
