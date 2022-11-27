import React, { Component } from 'react';
// import 'fonts/Basic-Regular.ttf';
import "App.css";
import "pages/unfinished_quizzes/unfinishedquiz.css";
import InfoUnfinished from "pages/unfinished_quizzes/infoUnfinished";
import API from "api.js";

class MainUnfinishedQuizzes extends Component {
  state = {
    id: 0,
    quizzes: []
  };
  constructor(props) {
    super(props);
    this.getUnfinishedQuizzes();
  }

  getUnfinishedQuizzes = () => {
    API.getUnfinishedQuizzes()
      .then((data) => {
        console.log(data.quizzes);
        this.setState({ quizzes: data.quizzes })
      })
  };

  render() {
    return (
      <div class="unfinishedQuizzes-App">
        <text className='unfinishedQuizzes-titleText'>CREATE A QUIZ</text><div><br /></div>
        <text className='unfinishedQuizzes-titleText2'>Drafts</text><div><br /></div>


        <center>
          <div className="unfinishedQuizzes-scroll-div2">
            <div class="unfinishedQuizzes-row2">
              <div style={{ flex: 1 }}>
                <div className="unfinishedQuizzes-column">
                  <text className='unfinishedQuizzes-esq'>
                    QUIZ NAME
                  </text>
                </div>
              </div>
              <div style={{ flex: 2 }}></div>
              <div style={{ flex: 1 }}>
                <div className="unfinishedQuizzes-column">
                  <text className='unfinishedQuizzes-right'>
                    LAST EDITED
                  </text>
                </div>
              </div>
            </div>
          </div>



          <div className="unfinishedQuizzes-scroll-div">
            {this.state.quizzes.map((quiz) => (
              <InfoUnfinished key={quiz[1]} name={quiz[0]} id={quiz[1]} time={quiz[2]} />

            ))}
            <InfoUnfinished key={"A"} name={"a"} id={"a"} time={"a"} />
          </div>
        </center>
      </div>
    );
  }
}



export default MainUnfinishedQuizzes;
