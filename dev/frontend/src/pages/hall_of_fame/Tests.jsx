import React from "react";
import Dropdown from "components/Select.jsx";
import TestsList from "components/TestsList.jsx";
import 'pages/hall_of_fame/HallOfFame.css'

const Tests = () => {
  return (
    <React.Fragment>
      <main className="HallOfFame-container">
        <h1 className="title">HISTORY & HALL OF FAME</h1>

        <Dropdown selected="tests" />
        <TestsList />
      </main>
    </React.Fragment>
  );
};

export default Tests;
