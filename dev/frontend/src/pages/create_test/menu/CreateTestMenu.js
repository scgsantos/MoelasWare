import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CREATE_RANDOM_TEST_URL,
  CREATE_TEST_URL,
  TEST_MENU_URL,
  CREATE_TEST_WITH_TAGS_URL,
} from "urls.js";
import "common.css";
import "./CreateTestMenu.css";

import CreateTestPanel from "./CreateTestPanel";

import history from "history.js";

function CreateTestMenu() {
  document.body.style = "background: var(--pink)";
  var [hasCreationPermisison, setCreationPermision] = useState(false);
  var [isHovering, setHovering] = useState(false);
  const [quizzesCount, setQuizzesCount] = useState(1);

  let navigate = useNavigate();

  function handleMouseOver() {
    setHovering(true);
  }

  function handleMouseOut() {
    setHovering(false);
  }

  fetch("http://localhost:8000/api/quizzes/count")
    .then((response) => response.json())
    .then((data) => {
      setQuizzesCount(data.quizzes_count);
    });

  function handleCreateRandomTestButton() {
    history.push(TEST_MENU_URL);

    navigate(CREATE_RANDOM_TEST_URL, {
      state: {
        quizzes_count: quizzesCount,
      },
    });
    window.location.reload();
  }

  function handleCreateRandomTestWithTagsButton() {
    history.push(TEST_MENU_URL);

    navigate(CREATE_TEST_WITH_TAGS_URL, {
      state: {
        quizzes_count: quizzesCount,
      },
    });
    window.location.reload();
  }

  function handleCreateTestButton() {
    history.push(TEST_MENU_URL);

    navigate(CREATE_TEST_URL);
    window.location.reload();
  }

  return (
    <div className="CreateTestMenu">
      <header className="CreateTestMenu-header">
        <h1>Create a Test</h1>
      </header>
      <section
        onMouseOver={() => handleMouseOver()}
        onMouseOut={() => handleMouseOut()}
        className="CreateTestPanel-section"
      >
        <CreateTestPanel
          text="RANDOM TEST"
          description="Completely random quizzes will be selected for the test"
          onClick={() => handleCreateRandomTestButton()}
        />
        <CreateTestPanel
          text="RANDOM TEST WITH SPECIFICATIONS"
          description="You choose the topics you want to appear in the quizzes"
          onClick={() => handleCreateRandomTestWithTagsButton()}
        />
        <CreateTestPanel
          text="CHOOSE QUIZZES FOR THE TEST"
          description="You choose each quizz you want for your test"
          onClick={() => handleCreateTestButton()}
        />
      </section>

      {!hasCreationPermisison && isHovering && (
        <div className="CreateTestMenu-warning">
          <button>You must have reviewed 3 quizzes to create a test</button>
        </div>
      )}
    </div>
  );
}

export default CreateTestMenu;
