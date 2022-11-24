import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import API from 'api.js';

function UsersList() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const usersHeader = [
    "USERNAME",
    "CORRECT ANSWERS",
    "SOLVED TESTS",
    "REGISTERED SINCE",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    API.getHallOfFameUsers().then((data) => {
      setUsers(data.fame);
      console.log(users)
     });
  }, []);


  const [selectedBtn, setSelectedBtn] = useState("");
  const navigate = useNavigate();

  const handleBtnClick = (selectedBtn) => {
    setSelectedBtn(selectedBtn);
    console.log(selectedBtn.target.id);
    navigate(`./${selectedBtn.target.id}`);
  };

  return (
    <section id="users">
      <form onSubmit={handleSubmit}>
        <input
          className="searchbar"
          type="search"
          placeholder="Search user by username or e-mail"
          size="30"
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>

      <table>
        <thead>
          <tr>
            {usersHeader.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => {
              if (query === "") {
                return u;
              } else if (
                Object.values(u)[0][0].toLowerCase().includes(query.toLowerCase())
              ) {
                return u;
              } else if (
                Object.values(u)[0][5].toLowerCase().includes(query.toLowerCase())
              ) {
                return u;
              }
              return false;
            })
            .map((u) => (
              <tr key={Object.values(u)[0][0]}>
                <td>{Object.values(u)[0][0]}</td>
                <td>{Object.values(u)[0][1]}</td>
                <td>
                  {Object.values(u)[0][2]}
                  {Object.values(u)[0][2] > 0 && (
                    <button
                      className="btn"
                      id={Object.values(u)[0][4]}
                      onClick={(e) => handleBtnClick(e)}
                    >
                      history
                    </button>
                  )}
                </td>
                <td><p>{Object.values(u)[0][3]}</p></td>
              </tr>
            ))}
        </tbody>
      </table>
      <Outlet />
    </section>
  );
}

export default UsersList;
