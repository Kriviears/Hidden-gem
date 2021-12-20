import React, { useState } from "react";
import "./SearchForm.css";
import { Card } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchForm = () => {
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
    //TODO: depends on backend filtering
  };

  const buttonClickHandler = (e, props) => {

    if (!searchInputs.category.includes(e.target.value)) {
      searchInputs.category.push(e.target.value);
    } else {
      searchInputs.category = searchInputs.category.filter(i => i !== e.target.value);
    }
    console.log(searchInputs.category);
  };

  return (
    <div className="search">
      <form className="search-form">
        <Card className="text-center">
          <Card.Header>
            <FaSearch
              style={{ cursor: "pointer" }}
              onClick={buttonClickHandler}
            ></FaSearch>
          </Card.Header>
          <Card.Body className="search-card-body">
            <Card.Title>
              <input className="slider" type="range" /><br></br>

              <input className="slider" type="range" />
            </Card.Title>
            <Card.Text>
              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="bars"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                BARS
              </label>

              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="entertainment"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                ENTERTAINMENT
              </label>

              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="food"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                FOOD
              </label>

              <label className="btn btn-primary">
                <input
                  type="checkbox"
                  className="btn-check"
                  value="sports"
                  onClick={(e) => buttonClickHandler(e, "value")}
                  id="btn-check"
                />
                SPORTS
              </label>
            </Card.Text>

            <label className="btn btn-primary">
              <input
                type="checkbox"
                className="btn-check"
                value="sports"
                onClick={(e) => buttonClickHandler(e, "value")}
                id="btn-check"
              />
              EDUCATION
            </label>

            <label className="btn btn-primary">
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
  );
};

export default SearchForm;