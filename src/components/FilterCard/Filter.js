<<<<<<< HEAD
import React from "react";
import classes from "./Filter.module.css";

function Filter() {
  return <div className={classes.container}></div>;
=======
import React, { useState } from "react";
import classes from "./Filter.module.css";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Filter() {
  const searchInputs = {
    stars: 0,
    distance: 0,
    category: [],
    location: "",
  };
  const [categories, setCategories] = useState([]);

  const mainSearchHandler = (e) => {
    e.preventDefault();
    console.log(searchInputs);
    // depends on backend filtering
  };

  const buttonClickHandler = (e, props) => {
    if (!searchInputs.category.includes(e.target.value)) {
      searchInputs.category.push(e.target.value);
    } else {
      searchInputs.category = searchInputs.category.filter(
        (i) => i !== e.target.value
      );
    }
    console.log(searchInputs.category);
  };

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <form className={classes.search_form}>
          <Card className="text-center">
            <Card.Header>
              <FaSearch
                style={{ cursor: "pointer" }}
                onClick={buttonClickHandler}
              ></FaSearch>
            </Card.Header>
            <Card.Body className="search-card-body">
              <Card.Title>
                <input className={classes.slider} type="range" />
                <br></br>

                <input className={classes.slider} type="range" />
              </Card.Title>
              <Card.Text>
                <label className="btn-btn-primary search-btn">
                  <input
                    type="checkbox"
                    className="btn-check"
                    value="bars"
                    onClick={(e) => buttonClickHandler(e, "value")}
                    id="btn-check"
                  />
                   OUTDOORS 
                </label>

                <label className="btn-btn-primary">
                  <input
                    type="checkbox"
                    className="btn-check"
                    value="entertainment"
                    onClick={(e) => buttonClickHandler(e, "value")}
                    id="btn-check"
                  />
                   DATE NIGHT 
                </label>

                <label className="btn-btn-primary">
                  <input
                    type="checkbox"
                    className="btn-check"
                    value="food"
                    onClick={(e) => buttonClickHandler(e, "value")}
                    id="btn-check"
                  />
                   FOOD 
                </label>

                <label className="btn-btn-primary">
                  <input
                    type="checkbox"
                    className="btn-check"
                    value="sports"
                    onClick={(e) => buttonClickHandler(e, "value")}
                    id="btn-check"
                  />
                   SIGHT SEEING 
                </label>
              </Card.Text>

              <label className="btn-btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="sports"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                 EDUCATION 
              </label>

              <label className="btn-btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="sports"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                 LATE NIGHT 
              </label>

              <label className="btn-btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="Education"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                 OTHER 
              </label>
            </Card.Body>
            <Card.Footer className="card-footer">
              <button className="search-button" onClick={mainSearchHandler}>
                SEARCH NOW
              </button>
            </Card.Footer>
          </Card>
        </form>
      </div>
    </div>
  );
>>>>>>> f4616155ffc5949b5bb674c37e7d3934ada96da5
}

export default Filter;
