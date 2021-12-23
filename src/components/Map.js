import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useModal from "../hooks/useModals";
import Geocoder from "react-map-gl-geocoder";
import Nav from "./Nav/Nav";
import GemForm from "./GemForm/GemForm";
import GemInfo from "./GemInfo/GemInfo";
import Profile from "./ProfileCard/Profile";
import Filter from "./FilterCard/Filter";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const {
    displayGemForm,
    displayGems,
    displayProfile,
    displayFilter,
    closeForm,
  } = useModal();

  const [selected, setSelected] = useState(null);
  const [userPos, setUserPos] = useState([]);
  const [distFilter, setDistFilter] = useState(Infinity);
  const [data, setData] = useState([]);
  const [showGems, setShowGems] = useState(false);

  useEffect(() => {
    function getPos(pos) {
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
    }

    navigator.geolocation.getCurrentPosition(getPos);
    setData([
      {
        lat: 39.6061,
        lng: -106.355,
        name: "Vail Mtn",
        category: "Outdoors",
        likes: 24,
        reviews: 25,
        description: "A ski place",
      },
      {
        lat: 43.582767,
        lng: -110.821999,
        name: "Jackson Hole",
        category: "Food",
        likes: 50,
        reviews: 57,
        description: "A ski place",
      },
      {
        lat: 40.4572,
        lng: -106.8045,
        name: "Steamboat",
        category: "Education",
        likes: 88,
        reviews: 100,
        description: "A ski place",
      },
      {
        lat: 39.8841,
        lng: -105.7627,
        name: "Winter Park",
        category: "Outdoors",
        likes: 50,
        reviews: 70,
        description: "A ski place",
      },
      {
        lat: 39.6425,
        lng: -105.8719,
        name: "Arapahoe Basin",
        category: "Education",
        likes: 60,
        reviews: 63,
        description: "A ski place",
      },
      {
        lat: 40.5884,
        lng: -111.6386,
        name: "Alta",
        category: "Food",
        likes: 89,
        reviews: 100,
        description: "A ski place",
      },
      {
        lat: 48.8606,
        lng: 2.3376,
        name: "The Louvre",
        category: "Education",
        likes: 77,
        reviews: 140,
        description: "A Museum",
      },
      {
        lat: 32.6118,
        lng: -80.0233,
        name: "The Ocean Course",
        category: "Sporting",
        likes: 99,
        reviews: 112,
        description: "A golf course",
      },
      {
        lat: 36.5725,
        lng: -121.9486,
        name: "Pebble Beach",
        category: "Sporting",
        likes: 84,
        reviews: 190,
        description: "A golf course",
      },
      {
        lat: 40.9673,
        lng: -74.294,
        name: "Chanos",
        category: "Food",
        likes: 70,
        reviews: 83,
        description: "The best burritos",
      },
      {
        lat: 40.6892,
        lng: -74.0445,
        name: "The Statue of Libery",
        category: "Sight Seeing",
        likes: 82,
        reviews: 103,
        description: "Some Statue",
      },
    ]);
  }, []);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: userPos[0],
    longitude: userPos[1],
    pitch: 60,
    zoom: 17,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        zoom: 17,
        pitch: 60,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  function toRad(val) {
    return (val * Math.PI) / 180;
  }

  function calcDist(lat, lng) {
    const radius = 6371;
    const latDist = toRad(lat - userPos[0]);
    const lngDist = toRad(lng - userPos[1]);
    const lat1 = toRad(userPos[0]);
    const lat2 = toRad(lat);

    var a =
      Math.sin(latDist / 2) * Math.sin(latDist / 2) +
      Math.sin(lngDist / 2) *
        Math.sin(lngDist / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = radius * c;
    return d / 1.609344;
  }

  function dropGem(e) {
    e.preventDefault();
    setData([
      ...data,
      {
        lat: userPos[0],
        lng: userPos[1],
        name: "My home",
        category: "Other",
        likes: 8,
        reviews: 8,
        description: "I live here",
      },
    ]);
    console.log(data);
    setViewport({
      ...viewport,
      zoom: 17,
      latitude: userPos[0],
      longitude: userPos[1],
      transitionDuration: 1000,
    });
    closeForm();
  }

  const navControlStyle = {
    right: 10,
    top: 50,
  };

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  return (
    <>
      <MapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/eruity/ckx571w430ll315mmqlgxoi0m"
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showAccuracyCircle={false}
          auto
        />
        {data
          .filter((el) => calcDist(el.lat, el.lng) < distFilter)
          .map((el) => {
            return (
              <Marker
                key={el.lat}
                latitude={el.lat}
                longitude={el.lng}
                offsetLeft={-10}
                offsetTop={-10}
              >
                {calcDist(el.lat, el.lng) < 0.11 ? (
                  <i
                    style={{ color: "#00ffcb", transform: "scale(1.3)" }}
                    class="fas fa-gem"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(el);
                      setViewport({
                        ...viewport,
                        zoom: 17,
                        latitude: el.lat,
                        longitude: el.lng,
                        transitionDuration: 1000,
                      });
                    }}
                  ></i>
                ) : el.category === "Food" ? (
                  <i
                    style={{ color: "red" }}
                    class="far fa-gem"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(el);
                      setViewport({
                        ...viewport,
                        zoom: 17,
                        latitude: el.lat,
                        longitude: el.lng,
                        transitionDuration: 1000,
                      });
                    }}
                  ></i>
                ) : el.category === "Education" ? (
                  <i
                    style={{ color: "blue" }}
                    class="far fa-gem"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(el);
                      setViewport({
                        ...viewport,
                        zoom: 17,
                        latitude: el.lat,
                        longitude: el.lng,
                        transitionDuration: 1000,
                      });
                    }}
                  ></i>
                ) : (
                  <i
                    class="far fa-gem"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(el);
                      setViewport({
                        ...viewport,
                        zoom: 17,
                        latitude: el.lat,
                        longitude: el.lng,
                        transitionDuration: 1000,
                      });
                      console.log(selected);
                    }}
                  ></i>
                )}
              </Marker>
            );
          })}

        {selected ? (
          <Popup
            latitude={selected.lat}
            longitude={selected.lng}
            offsetTop={-10}
            onClose={() => setSelected(null)}
          >
            <div
              style={{
                width: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>{selected.name}</h3>
                <h6>
                  {calcDist(selected.lat, selected.lng).toFixed(2)} miles from
                  you
                </h6>
              </div>
              <div style={{ width: "60px" }}>
                <CircularProgressbar
                  value={((selected.likes / selected.reviews) * 100).toFixed(0)}
                  text={`${((selected.likes / selected.reviews) * 100).toFixed(
                    0
                  )}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    pathColor: `${
                      ((selected.likes / selected.reviews) * 100).toFixed(0) <
                      60
                        ? "#e74c3c"
                        : ((selected.likes / selected.reviews) * 100).toFixed(
                            0
                          ) < 85
                        ? "#f1c40f"
                        : "#27ae60"
                    }`,
                    textColor: `${
                      ((selected.likes / selected.reviews) * 100).toFixed(0) <
                      60
                        ? "#e74c3c"
                        : ((selected.likes / selected.reviews) * 100).toFixed(
                            0
                          ) < 85
                        ? "#f1c40f"
                        : "#27ae60"
                    }`,
                    textSize: "25px",
                  })}
                />
              </div>
            </div>
          </Popup>
        ) : null}
        <Nav event={dropGem} openGem={() => setShowGems(!showGems)} />
      </MapGL>
      {displayProfile && <Profile />}
      {displayGemForm && <GemForm location={userPos} dropGem={dropGem} />}
      {displayGems && <GemInfo data={data} />}
      {displayFilter && <Filter />}
    </>
  );
};

export default Map;
