import React, { useState, useEffect } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import axios from "../../utils/axiosConfig";
import ReactTooltip from "react-tooltip";
import classes from "./ReviewCard.module.css";

function ReviewCard({ data, setSelect }) {
  const { state } = useProvideAuth();
  const { user } = state;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempVote, setTempVote] = useState(null);

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

  if (!loading && !tempVote) {
    if (currentUser.gemLikes.includes(data._id)) {
      setTempVote("like");
    }
    if (currentUser.gemDislikes.includes(data._id)) {
      setTempVote("dislike");
    }
  }

  const changeVote = async (e) => {
    e.preventDefault();
    setSelect(null);
    try {
      const response = await axios.post(
        `/gems/${tempVote}/${data._id}/${user.uid}`
      );
    } catch (err) {
      console.error(err);
    }
    setSelect(data);
  };

  const likeGem = async (e) => {
    e.preventDefault();
    setSelect(null);
    try {
      const response = await axios.post(`/gems/like/${data._id}/${user.uid}`);
    } catch (err) {
      console.error(err);
    }
    setSelect(data);
  };

  const dislikeGem = async (e) => {
    e.preventDefault();
    setSelect(null);
    try {
      const response = await axios.post(
        `/gems/dislike/${data._id}/${user.uid}`
      );
    } catch (err) {
      console.error(err);
    }
    setSelect(data);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : currentUser.gemLikes.includes(data._id) ? (
        <div>
          <span className={classes.voted}>
            <i class="fas fa-thumbs-up"></i>
          </span>
          <button className={classes.cancel} onClick={changeVote}>
            <i class="fas fa-times"></i>
          </button>
        </div>
      ) : currentUser.gemDislikes.includes(data._id) ? (
        <div>
          <span className={classes.voted}>
            <i class="fas fa-thumbs-down"></i>
          </span>
          <button
            className={classes.cancel}
            data-tip
            data-for="cancelTip"
            onClick={changeVote}
          >
            <i class="fas fa-times"></i>
          </button>
          <ReactTooltip id="cancelTip" place="right" effect="solid">
            Cancel Vote
          </ReactTooltip>
        </div>
      ) : (
        <div className={classes.card}>
          <form className={classes.form}>
            <label className={classes.radio}>
              <input
                className={classes.icon}
                name="rating"
                type="radio"
                value="like"
                onClick={likeGem}
              />
              <span>
                <i class="fas fa-thumbs-up"></i>
              </span>
            </label>
            <label className={classes.radio}>
              <input
                className={classes.icon}
                name="rating"
                type="radio"
                value="dislike"
                onClick={dislikeGem}
              />
              <span>
                <i class="fas fa-thumbs-down"></i>
              </span>
            </label>
          </form>
        </div>
      )}
    </>
  );
}

export default ReviewCard;
