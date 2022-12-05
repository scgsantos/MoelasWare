import React from "react";
import Dropdown from "components/Select.jsx";
import UsersList from "components/UsersList.jsx";
import 'pages/hall_of_fame/HallOfFame.css'
import Button from "components/Button.jsx";
import API from 'api.js';

const Users = () => {
  document.documentElement.style.setProperty("--base", "var(--beige)");

  return (
    <React.Fragment>
      <main className="HallOfFame-container">
        <h1 className="title">HISTORY & HALL OF FAME</h1>

        <Dropdown selected="users" />
        <UsersList />
      </main>
    </React.Fragment>
  );
};

export default Users;
