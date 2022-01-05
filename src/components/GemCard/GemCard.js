import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GemDetails from "../GemDetails/GemDetails";
import classes from "./GemCard.module.css";

function GemCard({ data }) {
  const [details, setDetails] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const rating = ((data.likes / data.reviews) * 100).toFixed(0);
  const color = rating < 60 ? "#e74c3c" : rating < 85 ? "#f1c40f" : "#27ae60";

  return (
    <>
      <div className={classes.card}>
        <div className={classes.info}>
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
          <div className={classes.bookmark}>
            {!bookmark && (
              <i
                style={{
                  color: "#8ab1f5",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                class="far fa-bookmark"
                onClick={() => setBookmark(!bookmark)}
              ></i>
            )}
            {bookmark && (
              <i
                style={{
                  color: "#4285f4",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                class="fas fa-bookmark"
                onClick={() => setBookmark(!bookmark)}
              ></i>
            )}
            {!details && (
              <i
                style={{
                  color: "#8ab1f5",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={() => setDetails(!details)}
                class="fas fa-arrow-circle-down"
              ></i>
            )}
            {details && (
              <i
                style={{
                  color: "#4285f4",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={() => setDetails(!details)}
                class="fas fa-arrow-circle-up"
              ></i>
            )}
          </div>
        </div>
      {details && <GemDetails data={data} />}
      </div>
    </>
  );
}

export default GemCard;
