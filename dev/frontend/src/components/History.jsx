import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from 'api.js';

function History(props) {
  const userHistHeader = ["TEST NAME", "TAG", "AUTHOR"];
  const testHistHeader = ["USERNAME", "GRADE"];
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUser] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  
 
  if (props.selected === "users") {
    API.getHallOfFameUserById(id)
      .then((data) => {
        setUsers(data.submissions);
        setUser(data.user);});
    return (
      <div
        role="button"
        className="history-wrapper"
        onClick={() => navigate(-1)}
      >
        <div
          role="button"
          className="history"
          onClick={(e) => e.stopPropagation()}
        >

          <h2>{username.toLocaleUpperCase()}'s HISTORY</h2>

          <table id="hist">
            <thead>
              <tr>
                {userHistHeader.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={Object.values(u)[0][3]}>
                  <td>{Object.values(u)[0][4]}</td>
                  <td>{Object.values(u)[0][1]}</td>
                  <td>{Object.values(u)[0][2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    API.getHallOfFameTestById(id)
    .then((data) => setTests(data.submissions));
    return (
      <div
        role="button"
        className="history-wrapper"
        onClick={() => navigate(-1)}
      >
        <div
          role="button"
          className="history"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>TEST #{id} HISTORY</h2>

          <table id="hist">
            <thead>
              <tr>
                {testHistHeader.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (

                <tr key={Object.values(t)[0][0]}>
                  <td>{Object.values(t)[0][1]}</td>
                  <td>{Math.round(Object.values(t)[0][2]/Object.values(t)[0][3]*100)}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default History;
