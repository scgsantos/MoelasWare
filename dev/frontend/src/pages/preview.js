import React from 'react';
import { format } from 'react-string-format';

import "../common.css"
import "./TestPreview.css"

import history from '../history.js';


class QuizList extends React.Component {

  constructor(props) {
    super();

    //console.log(history.location);

    this.state = { quizzes: history.location.state?.quizzes , quiz_id:0, answers: [], i:1, name: history.location.state?.name}
  }


  getQuizAnswers(id){

    var url = format('http://localhost:8000/api/quizzes/{0}/answers/', id);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ answers: data.answers })
        this.setState({i: 1})
      });

  }

  nextQuiz(id){
    if( this.state.quiz_id + 1 < this.state.quizzes.length){
      this.setState({quiz_id: this.state.quiz_id + 1})
      this.getQuizAnswers(this.state.quizzes[this.state.quiz_id+1]?.id);
    }else{
      this.setState({quiz_id: 0})
      this.getQuizAnswers(this.state.quizzes[0]?.id);
    }

  }

  prevQuiz(id){
    if( this.state.quiz_id - 1 < 0){
      this.setState({quiz_id: this.state.quizzes.length - 1})
      this.getQuizAnswers(this.state.quizzes[this.state.quizzes.length - 1]?.id);
    }else{
      this.setState({quiz_id: this.state.quiz_id - 1})
      this.getQuizAnswers(this.state.quizzes[this.state.quiz_id-1]?.id);
    }
  }

  renderAnswer(answer){
      if(answer?.correct){
        return <li className="quiz-correct"> Answer {this.state.i++}: &ensp;{answer?.text} </li>
      }else{
        return <li className="quiz-wrong"> Answer {this.state.i++}: &ensp;{answer?.text} </li>
      }
  }

    renderJustification(answer){
      if(answer?.correct){
        return <div className="preview-justification"><h3> Justification:</h3> <br></br>{answer?.justification}</div>
      }else{
        return null;
      }
  }


  goBack(){
    history.go(-1);
  }

  confirmTest(){

    var quizzes_ids = [];

    for( var j=0; j < this.state.quizzes.length; j++){
      quizzes_ids.push(this.state.quizzes[j]?.id);
    }

    console.log(quizzes_ids);

    fetch('http://localhost:8000/api/tests/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quizzes: quizzes_ids, name: this.state.name, author:1 })
    })
      .then(response => response.json());
  }

  render() {

    if( this.state.quizzes != null)
      var quiz = this.state.quizzes[this.state.quiz_id];

      if(this.state.answers.length == 0)
        this.getQuizAnswers(quiz?.id);



    /* TODO: - [x| ] recieve test name and author;
     *       - [x] go back to last page on Go Back button;
     *       - [x] post quiz on Confirm button;
     *       - [ ] add logo;
    */
      return (
        <div>
          <h2 className="preview-title">Create a Test</h2>
          <h1 className="preview-title">Name: {this.state.name}</h1>

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
            <button className="preview-buttonPublish" onClick={() => this.goBack()}>
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
}

export default QuizList;
