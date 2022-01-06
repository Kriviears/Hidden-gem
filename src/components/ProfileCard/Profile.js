import React, { useState } from "react";
import { useProvideAuth } from "../../hooks/useAuth";
import GemCard from "../GemCard/GemCard";
import classes from "./Profile.module.css";
import useModal from "../../hooks/useModals";

import test from "./test.png";

const user = {
  firstName: "Ethan",
  lastName: "Ruitenberg",
  city: "Wayne",
  state: "NJ",
  recentActivity: [
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
      lat: 48.8606,
      lng: 2.3376,
      name: "The Louvre",
      category: "Education",
      likes: 77,
      reviews: 140,
      description: "A Museum",
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
      lat: 32.6118,
      lng: 80.0233,
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
  ],
  bookmarks: [
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
      lat: 32.6118,
      lng: 80.0233,
      name: "The Ocean Course",
      category: "Sporting",
      likes: 99,
      reviews: 112,
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
  ],
  myGems: [
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
      lat: 40.6892,
      lng: -74.0445,
      name: "The Statue of Libery",
      category: "Sight Seeing",
      likes: 82,
      reviews: 103,
      description: "Some Statue",
    },
  ],
  password: "Password",
  icon: "",
};

function Profile() {
  const { closeProfile } = useModal();
  const { logout } = useProvideAuth();
  const [bookmarks, setBookmarks] = useState(false);
  const [activity, setActivity] = useState(false);
  const [myGems, setMyGems] = useState(false);

  return (
    <div className={classes.container}>
      <button onClick={closeProfile} className={classes.close}>
        <i class="fas fa-times"></i>
      </button>
      <button
        onClick={() => console.log("I will open some settings window.")}
        className={classes.settings}
      >
        <i class="fas fa-cog"></i>
      </button>
      <img className={classes.icon} src={test} alt="avatar icon" />
      <h2>Hi {user.firstName}!</h2>
      <p>
        {user.city}, {user.state}
      </p>
      <div
        className={classes.dropdown}
        onClick={() => setBookmarks(!bookmarks)}
      >
        <h5>My Bookmarks</h5>
        {!bookmarks && (
          <i style={{ color: "#8ab1f5" }} class="fas fa-arrow-circle-down"></i>
        )}
        {bookmarks && (
          <i style={{ color: "#4285f4" }} class="fas fa-arrow-circle-up"></i>
        )}
      </div>
      {bookmarks && (
        <div>
          {user.recentActivity.map((el) => (
            <GemCard data={el} />
          ))}
        </div>
      )}
      <div className={classes.dropdown} onClick={() => setMyGems(!myGems)}>
        <h5>My Gems</h5>
        {!myGems && (
          <i style={{ color: "#8ab1f5" }} class="fas fa-arrow-circle-down"></i>
        )}
        {myGems && (
          <i style={{ color: "#4285f4" }} class="fas fa-arrow-circle-up"></i>
        )}
      </div>
      {myGems && (
        <div>
          {user.myGems.map((el) => (
            <GemCard data={el} />
          ))}
        </div>
      )}
      <div className={classes.dropdown} onClick={() => setActivity(!activity)}>
        <h5>Recent Activity</h5>
        {!activity && (
          <i style={{ color: "#8ab1f5" }} class="fas fa-arrow-circle-down"></i>
        )}
        {activity && (
          <i style={{ color: "#4285f4" }} class="fas fa-arrow-circle-up"></i>
        )}
      </div>
      {activity && (
        <div>
          {user.recentActivity.map((el) => (
            <GemCard data={el} />
          ))}
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
