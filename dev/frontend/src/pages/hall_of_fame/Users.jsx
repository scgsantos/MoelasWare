import React from "react";
import Dropdown from "components/Select.jsx";
import UsersList from "components/UsersList.jsx";
import 'pages/hall_of_fame/HallOfFame.css'

const Users = () => {
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
