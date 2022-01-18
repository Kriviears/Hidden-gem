import React from "react";
import GemCard from "../GemCard/GemCard";
import useModal from "../../hooks/useModals";
import classes from "./GemInfo.module.css";

function GemInfo(props) {
  const { closeModal } = useModal();

  return (
    <div className={classes.container}>
      <button onClick={closeModal} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      {props.data.map((data) => (
        <GemCard
          location={props.location}
          key={data._id}
          data={data}
          setLocation={props.setLocation}
        />
      ))}
    </div>
  );
}

export default GemInfo;
