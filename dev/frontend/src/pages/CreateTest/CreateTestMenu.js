import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../logo.png";

import '../../common.css';
import './CreateTestMenu.css';

import CreateTestPanel from './CreateTestPanel';

import history from '../../history.js';

function CreateTestMenu() {
  var [hasCreationPermisison, setCreationPermision] = useState(false);
  var [isHovering, setHovering] = useState(false);


  let navigate = useNavigate();

  function handleMouseOver() {
    setHovering( true );
  }

  function handleMouseOut() {
    setHovering( false );
  };

  function handleCreateRandomTestButton() {
        console.log("AAA");
    history.push("/");

    navigate("/CreateTest");
    window.location.reload();
  }


    return (
      <div>
       <img src={logo} className="req-2-1-logo" alt="logo" />
        <header className="CreateTestMenu-header">
          <h1>Create a Test</h1>
        </header>
        <section onMouseOver={() => handleMouseOver()} onMouseOut={() => handleMouseOut()} className='CreateTestPanel-section' onClick={() => handleCreateRandomTestButton()}>
          <CreateTestPanel text="RANDOM TEST" description="Completely random quizzes will be selected for the test" />
          <CreateTestPanel text="RANDOM TEST WITH SPECIFICATIONS" description="You choose the topics you want to appear in the quizzes" />
          <CreateTestPanel text="CHOOSE QUIZZES FOR THE TEST" description="You choose each quizz you want for your test" />
        </section>

        {!hasCreationPermisison && isHovering && (
          <div className='CreateTestMenu-warning'>
            <button>You must have reviewed 3 quizzes to create a test</button>
          </div>
        )}

      </div>

    );


}

export default CreateTestMenu;
