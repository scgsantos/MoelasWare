import React, { useState } from "react";
import IncDecCounter from "../components/input_number";
import QuizList from "../components/QuizList";
import logo from "../logo.png";
import "./req_2_1.css";

function CreateRandomTest() {
  const [num, setNum] = useState(1);
  const [isPage1, setIsPage1] = useState(true);
  const [text, setText] = useState("");

  function handleCreateButtonChange() {
    setIsPage1(false);
  }

  function handleNameChange(e) {
    setText(e.target.value);
  }

  function handleNextButtonChange() {
    // goes to the
  }

  function handleGoBackChange() {
    setIsPage1(true);
  }

  if (isPage1) {
    return (
      <div className="req-2-1-firstPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />
        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test</h2>

        <IncDecCounter
          num={num}
          setNum={setNum}
          label={"Choose the number o quizzes you want in your test"}
        />

        <div className="req-2-1-buttonCreate">
          <button onClick={handleCreateButtonChange}>Next</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="req-2-1-secondPage">
        <img src={logo} className="req-2-1-logo" alt="logo" />

        <h1 className="req-2-1-title">Create a Test</h1>
        <h2 className="req-2-1-subTitle">Random Test</h2>

        <div className="req-2-1-inputDiv">
          <h1 className="req-2-1-inputTitle">{"Name your test"}</h1>
          <input
            className="req-2-1-inputText"
            type="text"
            name="name"
            onChange={handleNameChange}
          />
        </div>

        <div className="req-2-1-quizList">
          <QuizList num={num} name={text} />
        </div>

        <div className="req-2-1-Publish-GoBack-buttons">
          <button className="req-2-1-GoBackbutton" onClick={handleGoBackChange}>
            Go Back
          </button>
          <button
            className="req-2-1-NextButton"
            onClick={handleNextButtonChange}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default CreateRandomTest;
