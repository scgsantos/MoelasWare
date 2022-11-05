import React from 'react';

import '../common.css';
import './CreateTestMenu.css';

import CreateTestPanel from './CreateTestPanel';

class CreateTestMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasCreationPermisison: false, isHovering: false };
  }

  handleMouseOver() {
    console.log("AAA");
    this.setState({ isHovering: true });
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  };

  test() {
    alert("hello there");
  }

  render() {
    return (
      <div>
        <header className="CreateTestMenu-header">
          <h1>Create a Test</h1>
        </header>
        <section onMouseOver={() => this.handleMouseOver()} onMouseOut={() => this.handleMouseOut()} className='CreateTestPanel-section'>
          <CreateTestPanel text="RANDOM TEST" description="Completely random quizzes will be selected for the test" />
          <CreateTestPanel text="RANDOM TEST WITH SPECIFICATIONS" description="You choose the topics you want to appear in the quizzes" />
          <CreateTestPanel text="CHOOSE QUIZZES FOR THE TEST" description="You choose each quizz you want for your test" />
        </section>

        {!this.state.hasCreationPermisison && this.state.isHovering && (
          <div className='CreateTestMenu-warning'>
            <button>You must have reviewed 3 quizzes to create a test</button>
          </div>
        )}

      </div>

    );

  }
}

export default CreateTestMenu;
