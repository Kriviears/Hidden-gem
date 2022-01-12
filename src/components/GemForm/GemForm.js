import React, { useState, useRef } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import axios from "../../utils/axiosConfig";
import ReactTooltip from "react-tooltip";
import classes from "./GemForm.module.css";
import useModal from "../../hooks/useModals";

function GemForm(props) {
  const { closeForm } = useModal();
  const { state } = useProvideAuth();
  const [selected, setSelected] = useState("Other");
  const nameRef = useRef();
  const descRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const { user } = state;

  // Create a function to ensure everything is filled out,
  // this function will also send it to the backend,
  // then it will close the module and re-send the fetch requst

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObj = {
      user: user,
      lat: latRef.current.value,
      long: lngRef.current.value,
      name: nameRef.current.value,
      category: selected,
      description: descRef.current.value,
    };
    const res = await axios.post("/gems", dataObj);
    console.log(res);
    closeForm();
  };
  console.log(user);
  return (
    <div className={classes.container}>
      <button onClick={closeForm} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      <form>
        <h4 className={classes.title}>
          Share Your Hidden Gem <i class="far fa-gem"></i>
        </h4>
        <div>
          <input
            ref={latRef}
            type="number"
            id="lat"
            name="lat"
            className={classes.input}
            placeholder="Lat of Gem"
            required
          />
        </div>
        <div>
          <input
            ref={lngRef}
            type="number"
            id="lng"
            name="lng"
            className={classes.input}
            placeholder="Lng of Gem"
            required
          />
        </div>
        <div className={classes.name}>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            className={classes.input}
            placeholder="Name of Gem"
            required
          />
        </div>
        <p>Select a Category:</p>
        <div className={classes.radio_container}>
          <label className={classes.radio} data-tip data-for="foodTip">
            <input
              className={classes.icon}
              type="radio"
              for="Food"
              name="category"
              value="Food"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-utensils"></i>
            </span>
          </label>
          <ReactTooltip id="foodTip" place="bottom" effect="solid">
            Food
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="educationTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Education"
              value="Education"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-university"></i>
            </span>
          </label>
          <ReactTooltip id="educationTip" place="bottom" effect="solid">
            Education
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="lateTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Late Night"
              value="Late Night"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-cocktail"></i>
            </span>
          </label>
          <ReactTooltip id="lateTip" place="bottom" effect="solid">
            Late Night
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="outdoorsTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Outdoors"
              value="Outdoors"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-mountain"></i>
            </span>
          </label>
          <ReactTooltip id="outdoorsTip" place="bottom" effect="solid">
            Outdoors
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="dateTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Date Night"
              value="Date Night"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-heart"></i>
            </span>
          </label>
          <ReactTooltip id="dateTip" place="bottom" effect="solid">
            Date Night
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="entertainmentTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Entertainment"
              value="Entertainment"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-theater-masks"></i>
            </span>
          </label>
          <ReactTooltip id="entertainmentTip" place="bottom" effect="solid">
            Entertainment
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="sportingTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Sporting"
              value="Sporting"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-basketball-ball"></i>
            </span>
          </label>
          <ReactTooltip id="sportingTip" place="bottom" effect="solid">
            Sporting
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="sightTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Sight Seeing"
              value="Sight Seeing"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-binoculars"></i>
            </span>
          </label>
          <ReactTooltip id="sightTip" place="bottom" effect="solid">
            Sight Seeing
          </ReactTooltip>
          <label className={classes.radio} data-tip data-for="otherTip">
            <input
              className={classes.icon}
              type="radio"
              name="category"
              for="Other"
              value="Other"
              onClick={(e) => setSelected(e.target.value)}
            />
            <span>
              <i class="fas fa-question"></i>
            </span>
          </label>
          <ReactTooltip id="otherTip" place="bottom" effect="solid">
            Other
          </ReactTooltip>
        </div>
        <p>Please provide a short description!</p>
        <textarea
          ref={descRef}
          id="description"
          placeholder="Put words here..."
          className={classes.textarea}
          maxLength={250}
          required
        ></textarea>
        <div className={classes.btn_container}>
          <button className={classes.cancel} onClick={closeForm}>
            <i class="fas fa-times"></i>
          </button>
          <button type="submit" className={classes.gem} onClick={handleSubmit}>
            <i class="far fa-gem"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default GemForm;
