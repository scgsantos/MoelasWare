import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../fonts/Basic-Regular.ttf';
import "../App.css";
import "../unfinishedquiz.css";
import InfoUnfinished from './infoUnfinished';

class MainUnfinishedQuizzes extends Component {
    state={
        id: 0,
        quizzes: [["a","1"],["a","1"],["a","1"]]
    };
    constructor(props){
      super(props);
      //this.getUnfinishedQuizzes();
    }

    /*
    getUnfinishedQuizzes = () => {
      fetch('http://localhost:8000/unfinished_quizzes/',{
      method: "GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
        body: JSON.stringify({
          })
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({quizzes:data});
      })
    };
   */
    
    render() { 
        return(
    <div class="App">
      <div class="header">
        <div style={{ flex: 1}}>
          <div class="logo">
          <img src={logo} alt="logo" style={{
              alignSelf: 'top-left',
              width: '176px',
              height: '55px',
              marginTop: '22px',
              marginLeft: '48px',
          
          }}/>
          </div>
        </div>
        <div style={{ flex: 3}}><div className="column"></div></div>
        <div style={{ flex: 1}}>
          <div className="username">
            <text className='geral'>USER'S PROFILE</text>
          </div>
        </div>
        <div style={{ flex: 1}}>
          <div className="username">
            <text className='geral'>LOGOUT</text>
          </div>
        </div>
      </div><br/>
      <text className='titleText'>CREATE A QUIZ</text><div><br/></div>
      <text className='titleText2'>Drafts</text><div><br/></div>


      <center>
      <div className="scroll-div2">
        <div class="row2">
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='esq'>
                QUIZ NAME
              </text>
            </div>
          </div>
          <div style={{ flex: 2}}></div>
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='right'>
                  LAST EDITED
              </text>
            </div>
          </div>
          </div>
        </div>

        
        
        <div className="scroll-div">
        {this.state.quizzes.map((quiz) => (
            <InfoUnfinished name={quiz[0]} time={quiz[1]} link = 'https://www.google.com/webhp?authuser=1'/>
          ))}
        </div>
        </center>
    </div>
            );
    }
}



  export default MainUnfinishedQuizzes;