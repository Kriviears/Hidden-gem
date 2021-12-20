import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import useModal from "../hooks/useModals";
import Geocoder from "react-map-gl-geocoder";
import Nav from "./Nav/Nav";
import GemForm from "./GemForm/GemForm";
import GemInfo from "./GemInfo/GemInfo";
import Profile from "./ProfileCard/Profile";
import Filter from "./FilterCard/Filter";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const { displayGemForm, displayGems, displayProfile, displayFilter } =
    useModal();

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
        category: "rec",
        likes: 24,
      },
      {
        lat: 43.582767,
        lng: -110.821999,
        name: "Jackson Hole",
        category: "food",
        likes: 50,
      },
      {
        lat: 40.4572,
        lng: -106.8045,
        name: "Steamboat",
        category: "education",
        likes: 88,
      },
      {
        lat: 39.8841,
        lng: -105.7627,
        name: "Winter Park",
        category: "rec",
        likes: 50,
      },
      {
        lat: 39.6425,
        lng: -105.8719,
        name: "Arapahoe Basin",
        category: "education",
        likes: 60,
      },
      {
        lat: 40.5884,
        lng: -111.6386,
        name: "Alta",
        category: "food",
        likes: 89,
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
        name: "Me",
        category: "food",
        likes: 2,
      },
    ]);
    setViewport({
      ...viewport,
      zoom: 17,
      latitude: userPos[0],
      longitude: userPos[1],
      transitionDuration: 1000,
    });
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
                {el.category === "food" ? (
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
                ) : el.category === "education" ? (
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
            <h3>{selected.name}</h3>
            <h6>
              {calcDist(selected.lat, selected.lng).toFixed(2)} miles from you
            </h6>
          </Popup>
        ) : null}
        <Nav event={dropGem} openGem={() => setShowGems(!showGems)} />
      </MapGL>
      {displayProfile && <Profile />}
      {displayGemForm && <GemForm />}
      {displayGems && <GemInfo data={data} />}
      {displayFilter && <Filter />}
    </>
  );
};

export default Map;
