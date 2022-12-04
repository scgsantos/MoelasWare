import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/SVG/LOGO.svg";

import { USERS_URL, TEST_MENU_URL, SELECT_TEST_URL, REVIEW_URL } from "urls.js";

function Home(props) {
    document.documentElement.style.setProperty("--base", "var(--beige)");
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <React.Fragment>
                <div className="startmenu">
                    <Link to="/createquiz">
                        <h1>CREATE A QUIZ</h1>
                    </Link>
                    <Link to={SELECT_TEST_URL}>
                        <h1>SOLVE A TEST</h1>
                    </Link>
                    <Link to={REVIEW_URL}>
                        <h1>REVIEW A QUIZ</h1>
                    </Link>
                    <Link to={TEST_MENU_URL}>
                        <h1>CREATE A TEST</h1>
                    </Link>
                    <Link to={USERS_URL}>
                        <h1>
                            HISTORY <br></br>& <br></br>HALL OF FAME
                        </h1>
                    </Link>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <div className="startpage">
                <img src={logo} alt="logo" width="350" />
                <h2>
                    A crowd-sourced<br></br>quiz solving web app
                </h2>
            </div>
        );
    }
}

export default Home;
