import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";
import logo from "assets/SVG/LOGO.svg";
import API from "api.js";
import { useNavigate } from "react-router";

import { PROFILE_URL, AUTH_URL } from "urls.js";

function Header(props) {
    const isLoggedIn = props.isLoggedIn;

    const navigate = useNavigate();

    const handleLogout = () => {
        API.logout().then(() => {
            navigate("/");
            window.location.reload();
        });
    };

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
                    PROFILE
                </NavLink>
                <NavLink id="logout" onClick={handleLogout}>
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
                    style={{ marginLeft: "auto" }}
                    to={AUTH_URL}
                >
                    LOGIN/REGISTER
                </NavLink>
            </header>
        );
    }
}

export default Header;
