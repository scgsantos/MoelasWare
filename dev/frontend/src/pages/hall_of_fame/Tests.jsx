import React from "react";
import Dropdown from "components/Select.jsx";
import TestsList from "components/TestsList.jsx";
import "pages/hall_of_fame/HallOfFame.css";

const Tests = () => {
    document.documentElement.style.setProperty("--base", "var(--beige)");

    return (
        <React.Fragment>
            <main className="container" id="fame">
                <h1 className="title">HISTORY & HALL OF FAME</h1>

                <Dropdown selected="tests" />
                <TestsList />
            </main>
        </React.Fragment>
    );
};

export default Tests;
