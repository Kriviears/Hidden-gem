import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "../../utils/axiosConfig";
import { useProvideAuth } from "../../hooks/useAuth";
import useModal from "../../hooks/useModals";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "react-circular-progressbar/dist/styles.css";
import GemDetails from "../GemDetails/GemDetails";
import classes from "./GemCard.module.css";

function GemCard({ data }) {
  const { state } = useProvideAuth();
  const { user } = state;
  const {
    displayGems,
    displayProfile,
    openGems,
    closeGems,
    closeProfile,
    openProfile,
  } = useModal();
  const [details, setDetails] = useState(false);
  // const [bookmark, setBookmark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`users/${user.uid}`);
        setCurrentUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [user]);

  const bookmarkGem = async (gem, user) => {
    const gemId = gem._id;
    const userId = user._id;
    try {
      const response = await axios.patch(`/gems/bookmark/${gemId}/${userId}`);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    if (displayGems) {
      closeGems();
      openGems();
    }
    if (displayProfile) {
      closeProfile();
      openProfile();
    }
  };

  const reviews = data.likes.length + data.dislikes.length;

  const rating = (
    (data.likes.length / (data.likes.length + data.dislikes.length)) *
    100
  ).toFixed(0);
  const color = rating < 60 ? "#e74c3c" : rating < 85 ? "#f1c40f" : "#27ae60";

  return (
    <>
      {loading ? (
        <div className={classes.container}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={classes.card}>
          <div className={classes.info}>
            <h4>{data.name}</h4>
            <p>{data.category}</p>
          </div>
          <div className={classes.rating}>
            {reviews > 0 && (
              <CircularProgressbar
                value={rating}
                text={`${rating}%`}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: `${color}`,
                  textColor: `${color}`,
                  textSize: "25px",
                })}
              />
            )}
            <div className={classes.bookmark}>
              {currentUser.bookmarks.includes(data._id) ? (
                <i
                  style={{
                    color: "#4285f4",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  class="fas fa-bookmark"
                  onClick={() => bookmarkGem(data, currentUser)}
                ></i>
              ) : (
                <i
                  style={{
                    color: "#8ab1f5",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  class="far fa-bookmark"
                  onClick={() => bookmarkGem(data, currentUser)}
                ></i>
              )}

              {!details && (
                <i
                  style={{
                    color: "#8ab1f5",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDetails(!details)}
                  class="fas fa-arrow-circle-down"
                ></i>
              )}
              {details && (
                <i
                  style={{
                    color: "#4285f4",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDetails(!details)}
                  class="fas fa-arrow-circle-up"
                ></i>
              )}
            </div>
          </div>
          {details && <GemDetails data={data} />}
        </div>
      )}
    </>
  );
}

export default GemCard;
