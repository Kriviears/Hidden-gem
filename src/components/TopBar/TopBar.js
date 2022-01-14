import React from "react";
import axios from "../../utils/axiosConfig";
import { useProvideAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import classes from "./TopBar.module.css";

function TopBar({ location, setData }) {
  const { logout } = useProvideAuth();
  const getGems = async () => {
    const res = await axios.get(`/gems/${location[1]}/${location[0]}`);
    toast.success("Filters cleared");
    setData(res.data.nearGems);
  };

  return (
    <div className={classes.top}>
      <button className={classes.btn} onClick={getGems}>
        Clear Filters
      </button>
      <button className={classes.btn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default TopBar;
