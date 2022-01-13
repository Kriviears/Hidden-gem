import React, { useEffect, useState } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "../../utils/axiosConfig";

function PopupCard({ data, setSelected }) {
  const { state } = useProvideAuth();
  const { user } = state;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setSelected(null);
    try {
      const response = await axios.patch(`/gems/bookmark/${gemId}/${userId}`);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setSelected(data);
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
        <div style={{ height: "100%" }}>
          <LoadingSpinner />
        </div>
      ) : (
        <div
          style={{
            width: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>
              {data.name}{" "}
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
            </h3>
            <h6>{data.category}</h6>
            <h6>
              {(data.dist.calculated / 1609.344).toFixed(2)} miles from you
            </h6>
          </div>
          <div style={{ width: "60px" }}>
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
          </div>
        </div>
      )}
    </>
  );
}

export default PopupCard;
