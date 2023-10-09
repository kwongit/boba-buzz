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
        <NavLink className="nav-logo" exact to="/">
          <h2>BobaBuzz</h2>
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
