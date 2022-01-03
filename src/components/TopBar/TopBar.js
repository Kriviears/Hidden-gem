import React from "react";
import classes from "./TopBar.module.css";

function TopBar() {
  return (
    <div className={classes.top}>
      <button className={classes.btn}>Refresh Gems</button>
      <button className={classes.btn}>Clear Filers</button>
    </div>
  );
}

export default TopBar;
