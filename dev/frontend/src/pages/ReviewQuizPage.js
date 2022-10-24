import './ReviewQuizPage.css';
import React from 'react';
import Logo from '../components/Logo';

function ReviewQuizPage() {
    return (
    <div class="Container">
      <div class = "topbar">
        <div style={{ flex: 1}}></div>
        <div class = "logo" style={{ flex: 2}}>
          <Logo/>
        </div>
        
        <div class = "username" style={{ flex: 4}}>
          <text style={styles.geral}>Hi, username</text>
        </div>
        <div>
          <text style = {styles.middletitle}>LIST OF QUIZZES TO BE REVIEWED</text>
        </div>
      </div>
</div>
    );
  }

  const styles = {
    geral: {
      fontSize: 20,
    },
    middletitle:{
      fontSize: 20,
      fontWeight: "bold"
    },
  
  };
  
  
export default ReviewQuizPage;