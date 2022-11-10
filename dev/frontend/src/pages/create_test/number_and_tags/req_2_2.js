import React, { useState } from "react";
import IncDecCounter from "components/input_number";
import logo from "logo.png";
import "../req_2_1.css";

import { useNavigate } from "react-router-dom";

import { CREATE_TEST_URL, MENU_URL, PREVIEW_URL, CREATE_TEST_WITH_TAGS_URL } from "urls.js";
import history from 'history.js';

function CreateRandomTestWithSpecs() {
  const [num, setNum] = useState(1);
  const [isPage1, setIsPage1] = useState(true);
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [prev_tags, setPrevTags] = useState([]);

  const [quizzes, setQuizzes] = useState([]);

  if (history.location.state != null && quizzes.length == 0) {
    setNum(history.location.state.quizzes?.length);
    setText(history.location.state.name);
    setQuizzes(history.location.state?.quizzes);
    setTags(history.location.state?.tags);
    setPrevTags(history.location.state?.tags);
  }


  let navigate = useNavigate();

  function getFirstQuiz() {

    fetch('http://localhost:8000/api/quizzes/gen/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ num_quizzes: num, tags: tags })
    })
      .then(response => response.json())
      .then(data => {
        setQuizzes(data.quizzes);
      });

  }

  function handleCreateButtonChange() {
    setIsPage1(false);

    if (quizzes.length !== num || tags !== prev_tags) {
      getFirstQuiz();
    }
  }

  function handleNameChange(e) {
    setText(e.target.value);
  }

  function handleTagsChange(e) {
    setTags(e.target.value.split(" "));
  }

  function handleNextButtonChange() {
    if( text.length != 0){

      history.push(CREATE_TEST_WITH_TAGS_URL);

      navigate(PREVIEW_URL,
        { state: { tags: tags, name: text, quizzes: quizzes, previous_path: CREATE_TEST_WITH_TAGS_URL } },
      );
      window.location.reload();
    }
  }

  function handleGoBackChange() {
    setIsPage1(true);
  }

    function handleGoBackToMenu() {
    navigate(MENU_URL);
  }

  if (isPage1) {
    return (
      <div className="req-2-1-firstPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />
        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test with Specifications</h2>

        <IncDecCounter
          num={num}
          setNum={setNum}
          label={"Choose the number o quizzes you want in your test"}
        />

        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">{"Specify the tags you must have in the quizzes"}</h1>
          <input
            className="req-2-2-inputText"
            type="text"
            name="name"
            value={tags.join(" ")}
            onChange={handleTagsChange}
          />
        </div>

        <div className="req-2-1-Publish-GoBack-buttons">
          <div className="req-2-1-buttonCreate">
            <button onClick={handleGoBackToMenu}>Back</button>
          </div>
          &ensp;&ensp;
          <div className="req-2-1-buttonCreate">
            <button onClick={handleCreateButtonChange}>Next</button>
          </div>
        </div>

      </div>
    );
  } else {
    return (
      <div className="req-2-1-secondPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />

        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test with Specifications</h2>

        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">{"Name your test"}</h1>
          <input
            className="req-2-1-inputText"
            type="text"
            name="name"
            value={text}
            onChange={handleNameChange}
          />
        </div>

        <h3 className="req-2-1-title"> Chosen Quizzes: </h3>
        <ul >
          {quizzes.map((quiz) => <li className="quiz">{quiz.question}</li>)}
        </ul>

        <div className="req-2-1-Publish-GoBack-buttons">
          <button className="req-2-1-GoBackbutton" onClick={handleGoBackChange}>
            Go Back
          </button>

          <button className="req-2-1-GoBackbutton" onClick={getFirstQuiz}>
            Reroll Quizzes
          </button>

          <button
            className="req-2-1-CreateButton"
            onClick={handleNextButtonChange}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRandomTestWithSpecs;
