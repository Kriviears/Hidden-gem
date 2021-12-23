import React from "react";
import GemCard from "../GemCard/GemCard";
import classes from "./GemInfo.module.css";

function GemInfo(props) {
  return (
    <div className={classes.container}>
      {props.data.map((data) => (
        <GemCard data={data} />
      ))}
    </div>
  );
}

export default GemInfo;
