import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

import { PROFILE_URL } from "../urls.js"

class Header extends Component {
  render() {
    return (
      <header>
        <title>Moelasware Quizzes</title>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to="/"
          end
        >
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to={PROFILE_URL}
        >
          USER'S PROFILE
        </NavLink>
      </header>
    );
  }
}

export default Header;
