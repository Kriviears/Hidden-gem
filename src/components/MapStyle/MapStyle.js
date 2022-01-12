import React from "react";
import useModal from "../../hooks/useModals";
import blueprintPic from "../../images/blueprint.png";
import sunPic from "../../images/sunwashed.png";
import lightPic from "../../images/light.png";
import defaultPic from "../../images/default.png";
import useMap from "../../hooks/useMap";
import classes from "./MapStyle.module.css";

function MapStyle() {
  const { closeStyle } = useModal();
  const { setBlueprint, setLight, setSun, setDefault } = useMap();

  return (
    <div className={classes.container}>
      <button onClick={closeStyle} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      <div className={classes.card} onClick={setBlueprint}>
        <img className={classes.pic} src={blueprintPic} alt="Map preview" />
        <h3>Blueprint</h3>
      </div>
      <div className={classes.card} onClick={setLight}>
        <img className={classes.pic} src={lightPic} alt="Map preview" />
        <h3>Light</h3>
      </div>
      <div className={classes.card} onClick={setSun}>
        <img className={classes.pic} src={sunPic} alt="Map preview" />
        <h3>Sun Washed</h3>
      </div>
      <div className={classes.card} onClick={setDefault}>
        <img className={classes.pic} src={defaultPic} alt="Map preview" />
        <h3>Default</h3>
      </div>
    </div>
  );
}

export default MapStyle;
