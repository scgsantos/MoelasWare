import React from 'react';
import { format } from 'react-string-format';

import QuizList from "../components/QuizList";

import "./../common.css"
import "./TestPreview.css"


function PreviewTest()  {

    const quiz = this.state.quizzes[this.state.quiz_id];


    /* TODO: - [ ] recieve test name and author;
     *       - [ ] go back to last page on Go Back button;
     *       - [x] post quiz on Confirm button;
     *       - [ ] add logo;
    */
    return (
      <div>
        <h2 className="preview-title">Create a Test</h2>

            <div className="preview-container">
              <button className="preview-arrowButtons" style={{float:'left'}}  onClick={() => this.prevQuiz() }>
                  &lt;
              </button>

              <h1 className="preview-subTitle">Quizz #{this.state.quiz_id + 1} &ensp; {quiz?.question}</h1>

              <button className="preview-arrowButtons" style={{float:'right'}} onClick={() => this.nextQuiz()}>
                  &gt;
              </button>

            </div>

            <div className="preview-split">

            <ul className="preview-quizList">
              {this.state.answers.map((answer => this.renderAnswer(answer)))

              }
            </ul>


            {this.state.answers.map((answer => this.renderJustification(answer)))}



        </div>


        <div className="preview-container">
          <button className="preview-buttonPublish">
                  Go Back
          </button>
          &ensp;
          <button className="preview-buttonPublish"  onClick={() => this.confirmTest() }>
                  Confirm
          </button>
        </div>
      </div >
    )
}


export default QuizList;
