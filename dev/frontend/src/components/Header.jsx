import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "assets/SVG/LOGO.svg";

import { PROFILE_URL, LOGOUT_URL } from "urls.js"

class Header extends Component {
  render() {
    return (
      <header>
        <title>Moelasware Quizzes</title>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to="/"
          end
          id="logo"
        >

        <img src={logo} alt="logo" />

        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to={PROFILE_URL}
        >
          USER'S PROFILE
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to={LOGOUT_URL}
        >
          LOGOUT
        </NavLink>
      </header>
    );
  }
}

export default Header;
