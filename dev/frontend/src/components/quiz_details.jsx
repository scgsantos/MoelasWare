import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MyQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState([]);


  const navigate = useNavigate();

  const { id } = useParams();

  const users_link = "http://127.0.0.1:8000/api/quizzes/" + id + "/";

  useEffect(() => {
    fetch(users_link, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data.quiz);
        setAnswers(data.answers);});
  }, []);
  console.log(quizzes);

  let options = [];
  for (let i = 1; i < answers.length; i++) {
    options.push(
      <div className="answers">
        {answers}
        <p id="option">{answers[i][0]}</p>
        <p id="justification">{answers[i][1]}</p>
      </div>
    );
  }

  return (
    <div role="button" className="myquiz-wrapper" onClick={() => navigate(-1)}>
      <div className="myquizbox">
        <div
          role="button"
          className="myquiz"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>{quizzes[1]}</h2>
          <small>{quizzes[3]}</small>
          <p>{quizzes[4]}</p>
          <p>{quizzes[5]}</p>
          {options}
        </div>
      </div>
    </div>
  );
}

export default MyQuiz;
