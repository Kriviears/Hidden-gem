import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./GemCard.module.css";

function GemCard({ data }) {
  const rating = ((data.likes / data.reviews) * 100).toFixed(0);
  const color = rating < 60 ? "#e74c3c" : rating < 85 ? "#f1c40f" : "#27ae60";

  return (
    <div className={classes.card}>
      <div>
        <h4>{data.name}</h4>
        <p>{data.category}</p>
      </div>
      <div className={classes.rating}>
        <CircularProgressbar
          value={rating}
          text={`${rating}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: `${color}`,
            textColor: `${color}`,
            textSize: "25px",
          })}
        />
      </div>
    </div>
  );
}

export default GemCard;
