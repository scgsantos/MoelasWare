import React, { useState } from "react";
import { format } from "react-string-format";
import { useNavigate } from "react-router-dom";

import "common.css";
import "pages/create_test/preview/TestPreview.css";
import { CREATE_TEST_URL, TEST_PUBLISHED_URL } from "urls.js";
import history from "history.js";

function Preview() {
  document.documentElement.style.setProperty("--base", "var(--pink)");

  const [quizzes, setQuizzes] = useState(history.location.state?.quizzes);
  var [answers, setAnswers] = useState([]);
  var [quiz_id, setId] = useState(0);
  var [i, setIndex] = useState(1);
  const [name, setName] = useState(history.location.state?.name);

  let navigate = useNavigate();

  function getQuizAnswers(id) {
    var url = format("http://localhost:8000/api/quizzes/{0}/answers/", id);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data.answers);
        setIndex(1);
      });
  }

  function nextQuiz(id) {
    if (quiz_id + 1 < quizzes.length) {
      setId(quiz_id + 1);
      getQuizAnswers(quizzes[quiz_id + 1]?.id);
    } else {
      setId(0);
      getQuizAnswers(quizzes[0]?.id);
    }
  }

  function prevQuiz(id) {
    if (quiz_id - 1 < 0) {
      setId(quizzes.length - 1);
      getQuizAnswers(quizzes[quizzes.length - 1]?.id);
    } else {
      setId(quiz_id - 1);
      getQuizAnswers(quizzes[quiz_id - 1]?.id);
    }
  }

  function renderAnswer(answer) {
    if (answer?.correct) {
      return (
        <li className="quiz-correct">
          {" "}
          Answer {i++}: &ensp;{answer?.text}{" "}
        </li>
      );
    } else {
      return (
        <li className="quiz-wrong">
          {" "}
          Answer {i++}: &ensp;{answer?.text}{" "}
        </li>
      );
    }
  }

  function renderJustification(answer) {
    if (answer?.correct) {
      return (
        <div className="preview-justification">
          <h3> Justification:</h3> <br></br>
          {answer?.justification}
        </div>
      );
    } else {
      return null;
    }
  }

  function goBack() {
    navigate(history.location.state?.previous_path, {
      state: history.location.state,
    });
  }

  function confirmTest() {
    var quizzes_ids = [];

    for (var j = 0; j < quizzes.length; j++) {
      quizzes_ids.push(quizzes[j]?.id);
    }

    fetch("http://localhost:8000/api/tests/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizzes: quizzes_ids, name: name, author: 1 }),
    }).then((response) => response.json());

    navigate(TEST_PUBLISHED_URL);
    window.location.reload();
  }

  if (quizzes != null) var quiz = quizzes[quiz_id];

  if (answers.length == 0) getQuizAnswers(quiz?.id);

  return (
    <div className="test-preview">
      <h2 className="preview-subTitle">Create a Test</h2>
      <h1 className="preview-title">Test Name: {name}</h1>

      <div className="preview-container">
        <button
          className="preview-arrowButtons"
          style={{ float: "left" }}
          onClick={() => prevQuiz()}
        >
          &lt;
        </button>

        <h1 className="preview-subTitle">
          Quizz #{quiz_id + 1} &ensp; {quiz?.question}
        </h1>

        <button
          className="preview-arrowButtons"
          style={{ float: "right" }}
          onClick={() => nextQuiz()}
        >
          &gt;
        </button>
      </div>

      <div className="preview-split">
        <ul className="preview-quizList">
          {answers.map((answer) => renderAnswer(answer))}
        </ul>

        {/* TODO: Justification is not vertically aligned with answer */}

        {answers.map((answer => renderJustification(answer)))}



      </div>

      <div className="preview-container">
        <button className="preview-buttonPublish" onClick={() => goBack()}>
          Go Back
        </button>
        &ensp;
        <button className="preview-buttonPublish" onClick={() => confirmTest()}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Preview;
