import React, { useRef, useState } from "react";
import useModal from "../../hooks/useModals";
import classes from "./Settings.module.css";

function Settings() {
  const { openProfile } = useModal();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //********************************** */


  

  const handleSubmit = (e) => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return
    }

    e.preventDefault();
    const dataObj = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    console.log(dataObj);
   
  };

  // *******  BACKEND HERE? *********

  // try{

  // } catch(error){

  // }

  return (
    <div className={classes.container}>
      <button onClick={openProfile} className={classes.close}>
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3 className={classes.topTitle}>Settings</h3>
      <h4 className={classes.updateTitle}>Update Your Password</h4>

      <div>
        <input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          id=""
          name="lat"
          className={classes.input}
          placeholder="Old Password"
          required
        />
      </div>
      <div>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          id=""
          name="lng"
          className={classes.input}
          placeholder="New Password"
          required
        />
      </div>
      <div className={classes.name}>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="name"
          name="name"
          className={classes.input}
          placeholder="Confirm New Password"
          required
        />
      </div>
      <button
        className={classes.settingsBtn}
        onClick={handleSubmit}
      >
        Submit Update
      </button>
    </div>
  );
}

export default Settings;
