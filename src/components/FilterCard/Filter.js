import React, { useState } from "react";
import classes from "./Filter.module.css";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import useModal from "../../hooks/useModals";
import axios from "../../utils/axiosConfig";

function Filter({ location, setData }) {
  const [categories, setCategories] = useState([]);
  const [distance, setDistance] = useState(5);
  const { closeModal } = useModal();

  const addCategory = (category) => {
    if (categories.includes(category)) {
      let index = categories.indexOf(category);
      categories.splice(index - 1, 1);
      setCategories(categories);
    } else {
      setCategories([...categories, category]);
    }
  };

  const allCat = [
    "Food",
    "Education",
    "Late Night",
    "Outdoors",
    "Date Night",
    "Entertainment",
    "Sporting",
    "Sight Seeing",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meters = distance * 1609.344;
    if (categories.length === 0) {
      const filterObj = {
        distance: meters,
        categories: allCat,
      };
      const res = await axios.post(
        `/gems/filter/${location[1]}/${location[0]}`,
        filterObj
      );
      toast.success("Gems Filtered");
      setData(res.data.nearGems);
    } else {
      const filterObj = {
        distance: meters,
        categories: categories,
      };
      const res = await axios.post(
        `/gems/filter/${location[1]}/${location[0]}`,
        filterObj
      );
      toast.success("Gems Filtered");
      setData(res.data.nearGems);
    }
    closeModal();
  };

  return (
    <div className={classes.container}>
      <button onClick={closeModal} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      <form className={classes.search_form}>
        <h2 className={classes.title}>Filter Gems</h2>

        <h5>Filter by Distance:</h5>
        <small>0.25</small>
        <input
          className={classes.range}
          type="range"
          value={distance}
          min={0.25}
          max={15.0}
          step={0.25}
          onChange={(e) => setDistance(e.target.value)}
        />
        <small>15.00</small>
        <p>{distance} miles and in</p>

        <h5>Filter by Category:</h5>
        <div className={classes.checkbox_container}>
          <label className={classes.checkbox} data-tip data-for="foodTip">
            <input
              className={classes.icon}
              type="checkbox"
              for="Food"
              name="category"
              value="Food"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-utensils"></i>
            </span>
          </label>
          <ReactTooltip id="foodTip" place="bottom" effect="solid">
            Food
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="educationTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Education"
              value="Education"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-university"></i>
            </span>
          </label>
          <ReactTooltip id="educationTip" place="bottom" effect="solid">
            Education
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="lateTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Late Night"
              value="Late Night"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-cocktail"></i>
            </span>
          </label>
          <ReactTooltip id="lateTip" place="bottom" effect="solid">
            Late Night
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="outdoorsTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Outdoors"
              value="Outdoors"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-mountain"></i>
            </span>
          </label>
          <ReactTooltip id="outdoorsTip" place="bottom" effect="solid">
            Outdoors
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="dateTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Date Night"
              value="Date Night"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-heart"></i>
            </span>
          </label>
          <ReactTooltip id="dateTip" place="bottom" effect="solid">
            Date Night
          </ReactTooltip>
          <label
            className={classes.checkbox}
            data-tip
            data-for="entertainmentTip"
          >
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Entertainment"
              value="Entertainment"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-theater-masks"></i>
            </span>
          </label>
          <ReactTooltip id="entertainmentTip" place="bottom" effect="solid">
            Entertainment
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="sportingTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Sporting"
              value="Sporting"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-basketball-ball"></i>
            </span>
          </label>
          <ReactTooltip id="sportingTip" place="bottom" effect="solid">
            Sporting
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="sightTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Sight Seeing"
              value="Sight Seeing"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-binoculars"></i>
            </span>
          </label>
          <ReactTooltip id="sightTip" place="bottom" effect="solid">
            Sight Seeing
          </ReactTooltip>
          <label className={classes.checkbox} data-tip data-for="otherTip">
            <input
              className={classes.icon}
              type="checkbox"
              name="category"
              for="Other"
              value="Other"
              onClick={(e) => addCategory(e.target.value)}
            />
            <span>
              <i class="fas fa-question"></i>
            </span>
          </label>
          <ReactTooltip id="otherTip" place="bottom" effect="solid">
            Other
          </ReactTooltip>
        </div>
        <button className={classes.btn} onClick={handleSubmit}>
          Filter Results
        </button>
      </form>
    </div>
  );
}

export default Filter;
