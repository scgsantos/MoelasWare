import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import API from 'api.js';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState("Nothing");
  const [number_of_correct_answers, setNumberCorrectAnswers] = useState(0);
  const quizHeader = [
    "TAG",
    "CORRECT ANSWERS"
  ];
  
  useEffect(() => {
    API.getMyFinishedQuizzes()
      .then((data) => {
        setProfile(data.profile);
        setUser(data.user);
        setNumberCorrectAnswers(data.correct_answers)});
  }, []);

  return (

    <section id="profile">
      <h1>{user.toLocaleUpperCase()}'S PROFILE</h1>
      <table>
        <thead>
          <tr>
            {quizHeader.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          
          {Object.keys(profile).map((entrada) => (
          <tr>
            <td>{entrada}</td>
            <td>{profile[entrada]}/{number_of_correct_answers}</td>
          </tr>
          ))}
          
        </tbody>

      </table>
      <Outlet />
    </section>
  );
};
