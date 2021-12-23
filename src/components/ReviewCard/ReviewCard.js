import React from "react";
import classes from "./ReviewCard.module.css";
import "../GemForm/radio.css";

function ReviewCard() {
  return (
    <div className={classes.card}>
      <form>
        <label className={classes.radio}>
          <input type="radio" value="Good" />
          <span>
            <i class="fas fa-thumbs-up"></i>
          </span>
        </label>
        <label className={classes.radio}>
          <input type="radio" value="Good" />
          <span>
            <i class="fas fa-thumbs-down"></i>
          </span>
        </label>
      </form>
    </div>
  );
}

export default ReviewCard;
