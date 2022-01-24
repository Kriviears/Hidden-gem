import React, { useState, useEffect } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import axios from "../../utils/axiosConfig";
import classes from "./Profile.module.css";
import useModal from "../../hooks/useModals";
import GemCard from "../GemCard/GemCard";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";

function Profile({ setLocation, location }) {
  const { closeModal, openSettings } = useModal();
  const { state, logout } = useProvideAuth();
  const { user } = state;
  const [bookmarks, setBookmarks] = useState(false);
  const [myGems, setMyGems] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myBookmarks, setMyBookmarks] = useState([]);

  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`users/${user.uid}`);
        setData(response.data);
        setMyBookmarks(response.data.bookmarks);
        setLoading(false);
      } catch (err) {
        toast.error("Could not find user");
      }
    };
    getUser();
  }, [user]);

  const getBookmarks = async () => {
    setMyBooks([]);
    await myBookmarks.forEach(async (el) => {
      const res = await axios.get(`gems/${el}`);
      if (res.status == 404) return;
      return setMyBooks((myBooks) => [...myBooks, res.data]);
    });

    setBookmarks(!bookmarks);
  };

  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <div className={classes.spinner}>
            <RingLoader color="#4fd1c5" size={100} />
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <button onClick={closeModal} className={classes.close}>
            <i class="fas fa-times"></i>
          </button>
          <button onClick={openSettings} className={classes.settings}>
            <i class="fas fa-cog"></i>
          </button>
          <div className={classes.icon}>
            <i class="far fa-gem"></i>
          </div>
          <h2>Hi {data.username}!</h2>
          <div className={classes.dropdown} onClick={getBookmarks}>
            <h5>My Bookmarks</h5>
            {!bookmarks && (
              <i
                style={{ color: "#8ab1f5" }}
                class="fas fa-arrow-circle-down"
              ></i>
            )}
            {bookmarks && (
              <i
                style={{ color: "#4285f4" }}
                class="fas fa-arrow-circle-up"
              ></i>
            )}
          </div>
          {bookmarks && (
            <div>
              {myBooks.map((el) => (
                <GemCard
                  key={el._id}
                  location={location}
                  data={el}
                  setLocation={setLocation}
                />
              ))}
            </div>
          )}
          <div className={classes.dropdown} onClick={() => setMyGems(!myGems)}>
            <h5>My Gems</h5>
            {!myGems && (
              <i
                style={{ color: "#8ab1f5" }}
                class="fas fa-arrow-circle-down"
              ></i>
            )}
            {myGems && (
              <i
                style={{ color: "#4285f4" }}
                class="fas fa-arrow-circle-up"
              ></i>
            )}
          </div>
          {myGems && (
            <div>
              {data.gems?.map((el) => (
                <GemCard
                  key={el._id}
                  location={location}
                  data={el}
                  setLocation={setLocation}
                />
              ))}
            </div>
          )}
          <button className={classes.btn} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Profile;
