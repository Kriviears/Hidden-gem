import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import axios from "../utils/axiosConfig";
import useModal from "../hooks/useModals";
import useMap from "../hooks/useMap";
import { useProvideAuth } from "../hooks/useAuth";
import Nav from "./Nav/Nav";
import GemForm from "./GemForm/GemForm";
import GemInfo from "./GemInfo/GemInfo";
import Profile from "./ProfileCard/Profile";
import Filter from "./FilterCard/Filter";
import ReviewCard from "./ReviewCard/ReviewCard";
import MapStyle from "./MapStyle/MapStyle";
import Settings from "./ProfileSettings/Settings";
import TopBar from "./TopBar/TopBar";
import PopupCard from "./PopupCard/PopupCard";
import { RingLoader } from "react-spinners";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

console.log(MAPBOX_TOKEN);

const Map = () => {
  const {
    displayGemForm,
    displayGems,
    displayProfile,
    displayFilter,
    displayMapStyle,
    displaySettings,
  } = useModal();
  const { mapStyle } = useMap();
  const { state } = useProvideAuth();
  const [selected, setSelected] = useState(null);
  const [userPos, setUserPos] = useState([]);
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

    const getUser = async () => {
      try {
        const response = await axios.get(`users/${user.uid}`);
        setCurrentUser(response.data);
        setLoading(false);
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

  const navControlStyle = {
    right: 10,
    top: 50,
  };

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  const categoryObj = {
    Food: <i style={{ color: "green" }} class="fas fa-utensils"></i>,
    Education: <i style={{ color: "red" }} class="fas fa-university"></i>,
    "Late Night": <i style={{ color: "purple" }} class="fas fa-cocktail"></i>,
    Outdoors: <i style={{ color: "brown" }} class="fas fa-mountain"></i>,
    "Date Night": <i style={{ color: "pink" }} class="fas fa-heart"></i>,
    Entertainment: (
      <i style={{ color: "yellowgreen" }} class="fas fa-theater-masks"></i>
    ),
    Sporting: (
      <i style={{ color: "orange" }} class="fas fa-basketball-ball"></i>
    ),
    "Sight Seeing": <i style={{ color: "grey" }} class="fas fa-binoculars"></i>,
    Other: <i class="fas fa-question"></i>,
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RingLoader color="#4fd1c5" size={150} />
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
                  offsetTop={-20}
                >
                  {el.dist.calculated / 1609.344 < 0.11 ? (
                    <span
                      style={{ color: "#00ffcb", fontSize: "22px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected(el);
                        setViewport({
                          ...viewport,
                          zoom: 17,
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
                        });
                      }}
                    >
                      {categoryObj[el.category]}
                    </span>
                  ) : (
                    <span
                      style={{ fontSize: "22px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected(el);
                        setViewport({
                          ...viewport,
                          zoom: 17,
                          latitude: el.location.coordinates[1],
                          longitude: el.location.coordinates[0],
                        });
                      }}
                    >
                      {categoryObj[el.category]}
                    </span>
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
          <Nav openGem={() => setShowGems(!showGems)} />
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
