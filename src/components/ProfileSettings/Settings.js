import React from "react";
import useModal from "../../hooks/useModals";
import classes from "./Settings.module.css";

function Settings() {
  const { openProfile } = useModal();
  return (
    <div className={classes.container}>
      <button onClick={openProfile} className={classes.close}>
        <i class="fas fa-arrow-left"></i>
      </button>
    </div>
  );
}

export default Settings;
