import logo from '../images/logo.png';
import "../CSS/index.css";
import '../App.css';
import Grid from './grid-quizzes';
import '../fonts/Basic-Regular.ttf';
import React, { Component } from 'react';

class unfinishedq extends Component {
      
    state = {
        
        username: "",
        setUsername : "",
        quizzes: [],
        numberOfunfinishedquizzes :14
    }
    getQuizIds = () => {
        fetch('http://localhost:8000/unfinished_quizzes/',{
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
          body: JSON.stringify({
            
            id : "1"
            
          })
        })
        
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          this.setState(state => ({quizzes:data,numberofunfinishedquizzes:data.length})); 

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
      
            <Grid number = {this.state.numberOfunfinishedquizzes}/> 
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