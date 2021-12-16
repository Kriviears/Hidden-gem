import React from "react";
import classes from "./GemCard.module.css";

function GemCard({ data }) {
  return (
    <div className={classes.card}>
      <div>
        <h4>{data.name}</h4>
        <p>{data.category}</p>
      </div>
      <h2>{data.likes} Likes</h2>
    </div>
  );
}

export default GemCard;
