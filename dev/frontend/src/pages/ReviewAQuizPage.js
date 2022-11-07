import './ReviewQuizPage.css';
import React from 'react';
import Logo from '../components/Logo';

function ReviewAQuizPage() {
  return (
    
    <div class="Container">
      <div class="topbar">
        <div style={{ flex: 1 }}></div>
        <div class="logo" style={{ flex: 2 }}>
          <Logo />
        </div>

        <div class="username" style={{ flex: 4 }}>
          <text style={styles.geral}>Hi, username</text>
        </div>
        <div>
          <text style={styles.middletitle}>REVIEW A QUIZ</text>
        </div>
      </div>
      <div style={{ height: "20px" }}></div>
      <p style={styles.center}><text>REVIEW A QUIZ</text></p>
      <div class="row">
        <div class="column">
          <div class="answer">Answer #1</div>
          <div class="answer">Answer #2 </div>
          <div class="answer correct">Answer #3</div>
          <div class="answer">Answer #4</div>
          <div class="answer">Answer #5</div>
        </div>
        <div class="column">
          <div class="start">
            <h3 class="explanation">EXPLANAITON</h3>
            <p class="explanation">lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nunc nisl</p>
          </div>
        </div>
      </div>
      <h2 class="centered">
        EVALUATION
      </h2>
      <div class="row">
        <h4>Justification</h4>
        <textarea class="justification" type="text" name="Justification" placeholder="Justification"></textarea>
        <div style={{ height: "40px" }}></div>
        <div class="column">
          <button class="btn success" style={{marginLeft:"50%"}}>ACCEPT</button>
        </div>
        <div class="start">
          <div class="column">
            <button class="btn success" style={{marginLeft: "30%"}}>REJECT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  geral: {
    fontSize: 20,
  },
  center: {
    textAlign: "center",
    fontSize: 20,
  },
  middletitle: {
    fontSize: 20,
    fontWeight: "bold"
  },

};


export default ReviewAQuizPage;