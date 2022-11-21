import React from "react";
import logo from "../logo.svg";

const Home = () => {
  document.documentElement.style.setProperty("--base", "var(--beige)");
  return (
    <div className="startpage">
      <img src={logo} alt="logo" />
      <h2>
        A crowd-sourced<br></br>quiz solving web app
      </h2>
    </div>
  );
};

export default Home;
