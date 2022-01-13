import React from "react";
import classes from "./GemDetails.module.css";

function GemDetails({ data }) {
  console.log(data);
  const categoryObj = {
    Food: <i class="fas fa-utensils"></i>,
    Education: <i class="fas fa-university"></i>,
    "Late Night": <i class="fas fa-cocktail"></i>,
    Outdoors: <i class="fas fa-mountain"></i>,
    "Date Night": <i class="fas fa-heart"></i>,
    Entertainment: <i class="fas fa-theater-masks"></i>,
    Sporting: <i class="fas fa-basketball-ball"></i>,
    "Sight Seeing": <i class="fas fa-binoculars"></i>,
    Other: <i class="fas fa-question"></i>,
  };

  return (
    <div className={classes.details}>
      <div>
        <span className={classes.icon}>{categoryObj[data.category]}</span>
        <br />
        <small>
          {(data.dist.calculated / 1609.344).toFixed(2)} miles from you
        </small>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default GemDetails;
