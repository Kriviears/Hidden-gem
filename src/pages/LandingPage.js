import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.landingContainer}>
      <h2 className={classes.landingTitle}>
        Discover Hidden Gems Wherever You Travel
      </h2>

      <div className={classes.blur}>
        <h4 className={classes.landingInfo}>
          Uncover the top rated activites near you
        </h4>
        <h4 className={classes.landingInfo}>
          including unique attractions, family fun,
        </h4>
        <h4 className={classes.landingInfo}>
          romantic cafes, epic adventures and more!{" "}
        </h4>
      </div>

      <div className={classes.flexLandingBtns}>
        <Link to="/login">
          <Button className={classes.landingBtn}>Sign in</Button>
        </Link>

        <Link to="/register">
          <Button className={classes.landingBtn}>New? Register Here</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
