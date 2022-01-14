import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";
import { setAuthToken } from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { Form, Col } from "react-bootstrap";

import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const { login } = useProvideAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const res = await login(email, password);
      toast.success("Welcome back!");
      setAuthToken(res.token);
      navigate("/");
    } catch (err) {
      toast.error(`Email or password incorrect`);
    }
  };

  return (
    <div className={classes.form}>
      <div>
        <h2 className={classes.title}>Sign In To Hidden Gems</h2>
      </div>

      <form>
        <Form.Group as={Col}>
          <div>
            <input
              onChange={handleEmail}
              className={classes.input}
              placeholder="Email"
              value={email}
              type="email"
              required
            />
          </div>
          <div>
            <input
              onChange={handlePassword}
              placeholder="Password"
              className={classes.input}
              value={password}
              type="password"
              required
            />
          </div>
        </Form.Group>
      </form>
      <button
        className={classes.btn}
        style={{ marginTop: "10px", width: "300px" }}
        onClick={handleSubmit}
        type="submit"
      >
        Sign In
      </button>
      <Link to="/register">
        <p className={classes.link}>No account? Sign Up!</p>
      </Link>
    </div>
  );
};

export default LoginPage;
