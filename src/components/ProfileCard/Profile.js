import React, { useState, useEffect } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import axios from "../../utils/axiosConfig";
import classes from "./Profile.module.css";
import useModal from "../../hooks/useModals";
import GemCard from "../GemCard/GemCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import test from "./test.png";

function Profile() {
  const { closeProfile, openSettings } = useModal();
  const { state, logout } = useProvideAuth();
  const { user } = state;
  const [bookmarks, setBookmarks] = useState(false);
  const [activity, setActivity] = useState(false);
  const [myGems, setMyGems] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myBookmarks, setMyBookmarks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`users/${user.uid}`);
        setData(response.data);
        setMyBookmarks(response.data.bookmarks);
        setLikes(response.data.gemLikes);

        console.log("book", myBookmarks);
        const getLikes = async () => {
          await likes.map(async (el) => {
            const res = await axios.get(`gems/${el}`);
            return res.data;
          });
          console.log("Likes", likes);
        };
        getLikes();
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
    console.log(data);
  }, [user]);
  const getBookmarks = async () => {
    setMyBooks([]);
    await myBookmarks.forEach(async (el) => {
      const res = await axios.get(`gems/${el}`);
      return setMyBooks((myBooks) => [...myBooks, res.data]);
    });
    setBookmarks(!bookmarks);
  };

  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={classes.container}>
          <button onClick={closeProfile} className={classes.close}>
            <i class="fas fa-times"></i>
          </button>
          <button onClick={openSettings} className={classes.settings}>
            <i class="fas fa-cog"></i>
          </button>
          <img className={classes.icon} src={test} alt="avatar icon" />
          <h2>Hi {data.username}!</h2>
          {/* <p>
        {data.city}, {data.state}
      </p> */}
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
                <GemCard data={el} />
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
                <GemCard data={el} />
              ))}
            </div>
          )}
          {/* <div
            className={classes.dropdown}
            onClick={() => setActivity(!activity)}
          >
            <h5>Recent Activity</h5>
            {!activity && (
              <i
                style={{ color: "#8ab1f5" }}
                class="fas fa-arrow-circle-down"
              ></i>
            )}
            {activity && (
              <i
                style={{ color: "#4285f4" }}
                class="fas fa-arrow-circle-up"
              ></i>
            )}
          </div>
          {activity && (
            <div>
              {likes?.map((el) => (
                <GemCard data={el} />
              ))}
            </div>
          )} */}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </>
  );
}

export default Profile;
