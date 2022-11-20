import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MyQuiz() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const users_link = "http://127.0.0.1:8000/api/users/" + id + "/submissions/";

  useEffect(() => {
    fetch(users_link, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.submissions));
  }, []);

  return (
    <div role="button" className="myquiz-wrapper" onClick={() => navigate(-1)}>
      <div
        role="button"
        className="myquiz"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>QUIZ1</h2>
        <small>TAG</small>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</p>
      </div>
    </div>
  );
}

export default MyQuiz;
