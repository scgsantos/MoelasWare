import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

class Header extends Component {
  render() {
    return (
      <header>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to="/"
          end
        >
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to="/profile"
        >
          USER'S PROFILE
        </NavLink>
        <NavLink
          className={(navData) => (navData.isActive ? "active" : "none")}
          to="/logout"
        >
          LOGOUT
        </NavLink>
      </header>
    );
  }
}

export default Header;
