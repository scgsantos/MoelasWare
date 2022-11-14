import logo from '../images/logo.png';
import "../CSS/index.css";
import '../App.css';
import Grid from './grid-quizzes';
import '../fonts/Basic-Regular.ttf';
import React, { Component } from 'react';
import Button from '../components/buttons';
import { useEffect } from 'react';

class unfinishedq extends Component {
      
    state = {
        username: "",
        setUsername : "",
        quizzes: [],
        numberOfunfinishedquizzes :0
    }
    constructor(props){
      super(props);
      this.getQuizIds();
    }
    getQuizIds()  {
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
          console.log(data.length);
          this.setState( {quizzes:data,numberOfunfinishedquizzes:data.length}); 
          console.log(this.state.numberofunfinishedquizzes);
        })
      };
      
    render() { 
      
        return (
            <div class="App"> 
            <div class = "topbar">
                
              <div style={{flex: 1}}></div>
              <div class = "logo" style={{ flex: 2}}>
                <img src={logo} alt="logo" />
              </div>
              
              <div class = "username" style={{ flex: 4}}>
                <text style={styles.geral}>Hi, {this.state.username}</text>
              </div>
              <div>
                <text style = {styles.middletitle}>LIST OF UNFINISHED QUIZZES</text>
              </div>
            </div>
      
            {/* <div class = "choose-page">
              {Array.from(Array(Math.ceil(numberOfunfinishedquizzes/24)).keys()).map((i) => {return <Radiobutton page = {i + 1} unquiz = {numberOfunfinishedquizzes}/>})}
            </div> */}
            <div class = 'grid'>
                {console.log(Array.from(Array(this.state.numberOfunfinishedquizzes).keys()))}
                {Array.from(Array(this.state.numberOfunfinishedquizzes).keys())
                .map(
                  (i) => {return <Button buttonNumber = {i+1}/>}
                    )
                }
            </div>
            
          </div>
        );
    }

    
}
const styles = {
    container: {
      flex: 1,
      padding: 20,
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold"
    },
    geral: {
      fontSize: 20,
    },
    botao: {
      fontSize: 15,
    },
    esq: {
      fontSize: 20,
      textAlign: "left"
    },
    middletitle:{
      fontSize: 30,
      marginTop: 20,
      fontWeight: "bold",
    },
  
  };

export default unfinishedq;