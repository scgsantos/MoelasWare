import React from "react";
import Dropdown from "../components/select";
import UsersList from "../components/users_list";

const Users = () => {
  return (
    <React.Fragment>
      <main className="container">
        <h1 className="title">HISTORY & HALL OF FAME</h1>
        <Dropdown selected="users" />
        <UsersList />
      </main>
    </React.Fragment>
  );
};

export default Users;
