import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Button from "../../components/button";

const CreateQuiz = () => {
  document.documentElement.style.setProperty("--base", "var(--blue)");

  const quizzesHeader = ["QUIZ NAME", "TAG", "REVIEWS", "STATE"];
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/tests/", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setQuizzes(data.submissions_by_test));
  }, []);

  //const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e);
    navigate(`./myquiz/${e}`);
  };

  return (
    <React.Fragment>
      <main className="container" id="createquiz">
        <h1 className="title">CREATE A QUIZ</h1>
        <Button to="./new" className="createquiznav" text="NEW QUIZ" />
        <Button to="./drafts" className="createquiznav" text="DRAFTS (6)" />
        <h2>MY QUIZZES</h2>
        <section id="myquizzes">
          <table>
            <thead>
              <tr>
                {quizzesHeader.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quizzes.map((t) => (
                <tr
                  key={Object.values(t)[0][0]}
                  onClick={(e) => handleClick(Object.values(t)[0][0])}
                >
                  <td>{Object.values(t)[0][0]}</td>
                  <td>{Object.values(t)[0][1]}</td>
                  <td>{Object.values(t)[0][2]}</td>
                  <td>{Object.values(t)[0][3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default CreateQuiz;
