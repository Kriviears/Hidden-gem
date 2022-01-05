import React from "react";
import classes from "./GemDetails.module.css";

function GemDetails({ data }) {
  console.log(data)
  return (
    <div className={classes.details}>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
      </div>
      <div>
        <p>Created by put user here.</p>
        <p>distance in miles from you</p>
        <p>Maybe some Dispatch to set the viewport to that</p>
      </div>
    </div>
  );
}

export default GemDetails;
