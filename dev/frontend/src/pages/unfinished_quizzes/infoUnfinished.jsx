import React, { Component } from 'react';
import "pages/unfinished_quizzes/unfinishedquiz.css";
import API from "api.js";

class InfoUnfinished extends Component {


  constructor(props) {
    super(props);

  }

  sendQuizId = () => {
    API.sendQuizId(this.props.id)
      .then((data) => {
        console.log(this.props.id)
      })
  };

  render() {
    return (
      <div className="unfinishedQuizzes-row">
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}>
          <div className="unfinishedQuizzes-column">
            <text className='unfinishedQuizzes-esq'>
              <button class="unfinishedQuizzes-link-btn" onClick={() => this.sendQuizId(this.props.id)}>{this.props.name}</button>
            </text>
          </div>
        </div>
        <div style={{ flex: 17 }}></div>
        <div style={{ flex: 4 }}>
          <div className="unfinishedQuizzes-column">
            <text className='unfinishedQuizzes-right'>
              {this.props.time}
            </text>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }
}

export default InfoUnfinished;
