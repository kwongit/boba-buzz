import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-container">
      <li>
        <NavLink exact to="/">
          <img
            className="nav-container-img"
            src="../bobabuzz-logo.png"
            alt="nav-logo"
          ></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li className="nav-profile-btn">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
