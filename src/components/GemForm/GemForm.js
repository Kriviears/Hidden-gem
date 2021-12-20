import React from "react";
import classes from "./GemForm.module.css";

function GemForm() {
  return (
    <div className={classes.container}>
      <form>
        <h4>
          Create a Hidden Gem <i class="far fa-gem"></i>
        </h4>
        <input type="text" placeholder="Name of Gem" required />
        <p>Select a Category</p>
        <label>
          <input type="radio" name="category" value="Food" />
          <span>Food</span>
        </label>
        <label>
          <input type="radio" name="category" value="Education" />
          <span>Education</span>
        </label>
        <label>
          <input type="radio" name="category" value="Late Night" />
          <span>Late Night</span>
        </label>
        <label>
          <input type="radio" name="category" value="Outdoors" />
          <span>Outdoors</span>
        </label>
        <p>Please give provide a short description!</p>
        <textarea></textarea>
        <div>
          <button className={classes.cancel}>
            <i class="fas fa-times"></i>
          </button>
          <button className={classes.gem}>
            <i class="far fa-gem"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default GemForm;
