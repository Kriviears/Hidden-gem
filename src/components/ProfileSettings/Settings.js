import React, { useRef, useState } from "react";
import useModal from "../../hooks/useModals";
import { useProvideAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import classes from "./Settings.module.css";
import axios from "../../utils/axiosConfig";

function Settings() {
  const { openProfile, closeModal } = useModal();
  const { state } = useProvideAuth();
  const { user } = state;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newPassword)) {
      toast.error("See password requirements");
      return;
    }
    const dataObj = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const res = await axios.patch(`users/${user.uid}`, dataObj);
      toast.success("New password set!");
      closeModal();
    } catch (err) {
      toast.error(`Current password doesn't match, try again`);
    }
  };

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
          className={classes.input}
          placeholder="Confirm New Password"
          required
        />
      </div>
      <button className={classes.settingsBtn} onClick={handleSubmit}>
        Submit
      </button>
      <p className={classes.subtext}>
        Your new password must be at least 8 charaters long and contain at least
        one lower case, one upper case, and one digit.
      </p>
    </div>
  );
}

export default Settings;
