import React from "react";
import { Button, Container, Row} from "react-bootstrap";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.landingContainer}>
      <h2 className={classes.landingTitle}>
        Discover Hidden Gems Wherever You Travel
      </h2>
      <Container>
        
          <Row className={classes.blur}>
            <h4 className={classes.landingInfo}>Uncover the top rated activites near you</h4>
            <h4 className={classes.landingInfo}>including unique attractions, family fun,</h4>
            <h4 className={classes.landingInfo}>top rated romantic cafes and more! </h4>
          </Row>
        
      </Container>

      <Button onClick={() => console.log("Link to Sign")}className={classes.landingBtn}>Sign in</Button>
      <Button onClick={() => console.log("Link to register")} className={classes.landingBtn}>New? Register Here</Button>
    </div>
  );
};

export default LandingPage;
