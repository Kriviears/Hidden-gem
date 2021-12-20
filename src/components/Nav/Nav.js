import React from "react";
import useModal from "../../hooks/useModals";
import classes from "./Nav.module.css";

function Nav(props) {
  const { toggleForm, toggleGems, toggleProfile, toggleFilter } = useModal();
  return (
    <div className={classes.nav_container}>
      <nav className={classes.nav}>
        <button className={classes.btn} onClick={toggleProfile}>
          Profile
        </button>
        <button className={classes.btn}>Button</button>
        <button onClick={toggleForm} className={classes.gem}>
          <i class="far fa-gem"></i>
        </button>
        <button className={classes.btn} onClick={toggleGems}>
          View Gems
        </button>
        <button className={classes.btn} onClick={toggleFilter}>
          Filter
        </button>
      </nav>
    </div>
  );
}

export default Nav;
