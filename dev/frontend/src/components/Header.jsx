import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "assets/SVG/LOGO.svg";

import { PROFILE_URL, LOGOUT_URL, AUTH_URL } from "urls.js";

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <header>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "active" : "none"
                    }
                    to="/"
                    end
                    id="logo"
                >
                    <img src={logo} alt="logo" />
                </NavLink>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "active" : "none"
                    }
                    to={PROFILE_URL}
                >
                    USER'S PROFILE
                </NavLink>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "active" : "none"
                    }
                    to={LOGOUT_URL}
                >
                    LOGOUT
                </NavLink>
            </header>
        );
    } else {
        return (
            <header>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "active" : "none"
                    }
                    to="/"
                    end
                    id="logo"
                    style={(navData) =>
                        navData.isActive
                            ? { display: "none" }
                            : { display: "block" }
                    }
                >
                    <img src={logo} alt="logo" />
                </NavLink>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "active" : "none"
                    }
                    style={(navData) =>
                        !navData.isActive ? { marginLeft: "auto" } : null
                    }
                    to={AUTH_URL}
                >
                    LOGIN/REGISTER
                </NavLink>
            </header>
        );
    }
}

export default Header;
