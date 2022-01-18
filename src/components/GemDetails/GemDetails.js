import React from "react";
import classes from "./GemDetails.module.css";

function GemDetails({ data, location }) {
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
        {data.dist && (
          <small>
            {(data.dist.calculated / 1609.344).toFixed(2)} miles from you
          </small>
        )}
        <br />
        <p>{data.description}</p>
      </div>
      <a
        href={`https://www.google.com/maps/dir/${location[0]},${location[1]}/${data.location.coordinates[1]},${data.location.coordinates[0]}`}
        target="_blank"
        className={classes.link}
      >
        <i class="fas fa-location-arrow"></i>
      </a>
    </div>
  );
}

export default GemDetails;
