import React, { useState } from "react";
import classes from "./ReviewCard.module.css";

function ReviewCard(props) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      gem: props.gem.name,
      rating: selected,
    });
  };

  return (
    <div className={classes.card}>
      <form className={classes.form}>
        <label className={classes.radio}>
          <input
            className={classes.icon}
            name="rating"
            type="radio"
            value="Good"
            onClick={(e) => setSelected(e.target.value)}
          />
          <span>
            <i class="fas fa-thumbs-up"></i>
          </span>
        </label>
        <label className={classes.radio}>
          <input
            className={classes.icon}
            name="rating"
            type="radio"
            value="Bad"
            onClick={(e) => setSelected(e.target.value)}
          />
          <span>
            <i class="fas fa-thumbs-down"></i>
          </span>
        </label>
        <button className={classes.send} onClick={handleSubmit} type="submit">
          <i class="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
}

export default ReviewCard;
