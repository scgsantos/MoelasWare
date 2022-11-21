import React, { Component } from 'react';
import "../unfinishedquiz.css";

class InfoUnfinished extends Component {


    constructor(props){
      super(props);

    }

    sendQuizId = () => {
      fetch('http://localhost:8000/api/unfinished_quizzes_edit/',{
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
        body: JSON.stringify({
          id : this.props.id
          })
      })
      .then(response => response.json())
      .then((data) => {
      })
    };

    render() { 
        return(
          <div className="row">
          <div style={{ flex: 1}}></div>
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='esq'>
                <button class="link-btn" onClick={()=>this.sendQuizId()}>{this.props.name}</button>
              </text>
            </div>
          </div>
          <div style={{ flex: 17}}></div>
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='right'>
                  {this.props.time}
              </text>
            </div>
          </div>
          <div style={{ flex: 1}}></div>
        </div>
        );
    }
}

export default InfoUnfinished;