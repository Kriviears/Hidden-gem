import React from "react";
import classes from "./Nav.module.css";

function Nav(props) {
  return (
    <div className={classes.nav_container}>
      <nav className={classes.nav}>
        <button className={classes.btn}>Profile</button>
        <button className={classes.btn}>Button</button>
        <button onClick={props.event} className={classes.gem}>
          <i class="far fa-gem"></i>
        </button>
        <button className={classes.btn}>View Gems</button>
        <button className={classes.btn}>Filter</button>
      </nav>
    </div>
  );
}

export default Nav;
