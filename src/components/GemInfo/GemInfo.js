import React from "react";
import GemCard from "../GemCard/GemCard";
import useModal from "../../hooks/useModals";
import classes from "./GemInfo.module.css";

function GemInfo(props) {
  const { closeGems } = useModal();
  return (
    <div className={classes.container}>
      <button onClick={closeGems} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      {props.data.map((data) => (
        <GemCard key={data._id} data={data} />
      ))}
    </div>
  );
}

export default GemInfo;
