import React from "react";
import classes from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={classes.spinner}>
      <div className={classes.blue}></div>

      <div className={classes.green}></div>

      <div className={classes.red}></div>

      <div className={classes.b1}></div>
      <div className={classes.b2}></div>
      <div className={classes.b3}></div>
    </div>
  );
}

export default LoadingSpinner;
