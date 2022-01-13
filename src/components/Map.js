import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "../utils/axiosConfig";
// import "react-circular-progressbar/dist/styles.css";
import useModal from "../hooks/useModals";
import useMap from "../hooks/useMap";
import { useProvideAuth } from "../hooks/useAuth";
import Geocoder from "react-map-gl-geocoder";
import Nav from "./Nav/Nav";
import GemForm from "./GemForm/GemForm";
import GemInfo from "./GemInfo/GemInfo";
import Profile from "./ProfileCard/Profile";
import Filter from "./FilterCard/Filter";
import ReviewCard from "./ReviewCard/ReviewCard";
import MapStyle from "./MapStyle/MapStyle";
import Settings from "./ProfileSettings/Settings";
import TopBar from "./TopBar/TopBar";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import PopupCard from "./PopupCard/PopupCard";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const {
    displayGemForm,
    displayGems,
    displayProfile,
    displayFilter,
    displayMapStyle,
    displaySettings,
    closeForm,
  } = useModal();
  const { mapStyle } = useMap();
  const { state } = useProvideAuth();
  // const { user } = state;

  const [bookmark, setBookmark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userPos, setUserPos] = useState([]);
  const [distFilter, setDistFilter] = useState(Infinity);
  const [data, setData] = useState([]);
  const [showGems, setShowGems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [location, setLocation] = useState(false);

  useEffect(() => {
    const { user } = state;
    function getPos(pos) {
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
      setLocation(true);
      getUser();
    }

    navigator.geolocation.getCurrentPosition(getPos);
    console.log(navigator.geolocation.getCurrentPosition(getPos));

    const getUser = async () => {
      try {
        const response = await axios.get(`users/${user.uid}`);
        setCurrentUser(response.data);
        setLoading(false);
        console.log(data);
        console.log(currentUser);
      } catch (err) {
        console.error(err);
      }
    };
  }, []);

  if (location) {
    const getGems = async () => {
      const res = await axios.get(`/gems/${userPos[1]}/${userPos[0]}`);
      setData(res.data.nearGems);
    };
    getGems();
    setLocation(false);
  }

  const getSearchGems = async (searchLong, searchLat) => {
    const res = await axios.get(`/gems/${searchLong}/${searchLat}`);
    console.log(res.data.nearGems);
    setData(res.data.nearGems);
  };

  const bookmarkGem = async (gem, user) => {
    setSelected(null);
    const gemId = gem._id;
    const userId = user._id;
    try {
      const response = await axios.patch(`/gems/bookmark/${gemId}/${userId}`);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    // setSelected(gem);
  };

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
      {loading ? (
        <div style={{ height: "100vh" }}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <MapGL
            ref={mapRef}
            {...viewport}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={mapStyle}
          >
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
              onResult={(res) =>
                getSearchGems(res.result.center[0], res.result.center[1])
              }
            />
            <NavigationControl style={navControlStyle} />
            <GeolocateControl
              style={geolocateControlStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showAccuracyCircle={false}
              auto
            />
            {data.map((el) => {
              return (
                <Marker
                  key={el._id}
                  latitude={el.location.coordinates[1]}
                  longitude={el.location.coordinates[0]}
                  offsetLeft={-10}
                  offsetTop={-10}
                >
                  {el.dist.calculated / 1609.344 < 0.11 ? (
                    <i
                      style={{ color: "#00ffcb", transform: "scale(1.3)" }}
                      class="fas fa-gem"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected(el);
                        setViewport({
                          ...viewport,
                          zoom: 17,
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
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
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
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
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
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
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
                          transitionDuration: 1000,
                        });
                      }}
                    ></i>
                  )}
                </Marker>
              );
            })}

            {selected ? (
              <Popup
                latitude={selected.location.coordinates[1]}
                longitude={selected.location.coordinates[0]}
                offsetTop={-10}
                onClose={() => setSelected(null)}
              >
                <PopupCard data={selected} setSelected={setSelected} />
                {selected.dist.calculated / 1609.344 < 0.11 && (
                  <ReviewCard data={selected} setSelect={setSelected} />
                )}
              </Popup>
            ) : null}
          </MapGL>
          <TopBar location={userPos} setData={setData} />
          <Nav event={dropGem} openGem={() => setShowGems(!showGems)} />
          {displayProfile && <Profile setLocation={setLocation} />}
          {displayGemForm && (
            <GemForm location={userPos} setLocation={setLocation} />
          )}
          {displayGems && <GemInfo data={data} setLocation={setLocation} />}
          {displayFilter && <Filter location={userPos} setData={setData} />}

          {displayMapStyle && <MapStyle />}
          {displaySettings && <Settings />}
        </>
      )}
    </>
  );
};

export default Map;
