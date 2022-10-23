import "./App.css";
import "./index.css";
import React from "react";
import logo from './images/logo.png';
import Quiz from "./components/createQuiz";
import './font/Basic-Regular.ttf';

const App = () => {
  return (
    <div class="App">
      <div className='new-line'><br/></div>
      <div class = "topbar">
        <div style={{ flex: 1}}></div>
        <div class = "logo" style={{ flex: 2}}>
          <img src={logo} alt="logo" />
        </div>
        
        <div class = "username" style={{ flex: 4}}>
          <text style={styles.geral}>Hi, username</text>
        </div>
        <div>
          <text style = {styles.titleText}>CREATE A QUIZ</text>
        </div>
      </div>

      <div className='new-line'><br/></div>

      <div className="row">
        <div style={{ flex: 1}}></div>
        <div style={{ flex: 4}}>
          <div className="column">
            <text style={styles.esq}>Question #1</text>
            <div className='new-line'><br/></div>
            <text style={styles.esq}><input class="input" type="text" name="qname"></input></text>
          </div>
        </div>
        <div style={{ flex: 3}}></div>
        <div style={{ flex: 4}}></div>
      </div>

      <div className='new-line'><br/></div>

      <div className="row">
        <div style={{ flex: 1}}></div>
        <div style={{ flex: 15}}>
          <div className="column">
            <text>(Please select the correct answer)</text>
          </div>
        </div>
        <div style={{ flex: 3}}></div>
        <div style={{ flex: 4}}></div>
      </div>
      
      <Quiz numberFromParent = {1}/>
      <div className='new-line'><br/></div>
      <Quiz numberFromParent = {2}/>
      <div className='new-line'><br/></div>
      <Quiz numberFromParent = {3}/>
      <div className='new-line'><br/></div>
      <Quiz numberFromParent = {4}/>
      <div className='new-line'><br/></div>
      <Quiz numberFromParent = {5}/>
      <div className='new-line'><br/></div>
      <Quiz numberFromParent = {6}/>

      <br/><br/>
      <button class="button"><text style={styles.botao}>Create Quiz</text></button>
      <div className='new-line'><br/></div>
    </div>
  );
};

const styles = {
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
  }
};

export default App;
