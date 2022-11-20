import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  document.documentElement.style.setProperty("--base", "var(--beige)");
  return (
    <React.Fragment>
      <div className="startmenu">
        <Link to="/createquiz">
          <h1>CREATE A QUIZ</h1>
        </Link>
        <Link to="/#">
          <h1>REVIEW A QUIZ</h1>
        </Link>
        <Link to="/#">
          <h1>SOLVE A TEST</h1>
        </Link>
        <Link to="/#">
          <h1>CREATE A TEST</h1>
        </Link>
        <Link to="/users">
          <h1>
            HISTORY <br></br>& <br></br>HALL OF FAME
          </h1>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
