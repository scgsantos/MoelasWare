import React from "react";
import Dropdown from "../components/select";
import TestsList from "../components/tests_list";

const Tests = () => {
  document.documentElement.style.setProperty("--base", "var(--beige)");
  return (
    <React.Fragment>
      <main className="container">
        <h1 className="title">HISTORY & HALL OF FAME</h1>

        <Dropdown selected="tests" />
        <TestsList />
      </main>
    </React.Fragment>
  );
};

export default Tests;
