import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "api.js"

import {
  CREATE_RANDOM_TEST_URL,
  CREATE_TEST_URL,
  TEST_MENU_URL,
  CREATE_TEST_WITH_TAGS_URL,
} from "urls.js";
import "common.css";
import "pages/create_test/menu/CreateTestMenu.css";

import CreateTestPanel from "pages/create_test/menu/CreateTestPanel.jsx";

import history from "history.js";

function CreateTestMenu() {
  document.documentElement.style.setProperty("--base", "var(--pink)");

  var [hasCreationPermission, setCreationPermission] = useState(false);
  var [isHovering, setHovering] = useState(false);

  let navigate = useNavigate();


  useEffect(() => {
    API.canCreateTest().then((data) => {
      setCreationPermission(data.can_create_test);
    });
  }, []);



  function handleMouseOver() {
    setHovering(true);
  }

  function handleMouseOut() {
    setHovering(false);
  }

  function handleCreateRandomTestButton() {
    history.push(TEST_MENU_URL);

    if (hasCreationPermission) {
      navigate(CREATE_RANDOM_TEST_URL);
    }
  }


  function handleCreateRandomTestWithTagsButton() {
    history.push(TEST_MENU_URL);
    if (hasCreationPermission) {
      navigate(CREATE_TEST_WITH_TAGS_URL);
    }
  }

  function handleCreateTestButton() {
    history.push(TEST_MENU_URL);
    if (hasCreationPermission) {
      navigate(CREATE_TEST_URL);
    }
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

      {!hasCreationPermission && isHovering && (
        <div className="CreateTestMenu-warning">
          <button>You must have reviewed 3 quizzes to create a test</button>
        </div>
      )}
    </div>
  );
}

export default CreateTestMenu;
