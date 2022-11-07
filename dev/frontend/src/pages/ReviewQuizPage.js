import './ReviewQuizPage.css';
import React from 'react';
import Logo from '../components/Logo';
import { useNavigate } from "react-router-dom";


function ReviewQuizPage() {
  let navigate = useNavigate();
  let data = [
    {
      "id": 1,
      "name": "Quiz 1",
      "tag": "tag1",
      "creator": "creator1",
      "creation_date": "2021-05-01",
      "reviews": 1,
    },
    {
      "id": 2,
      "name": "Quiz 2",
      "tag": "tag2",
      "creator": "creator2",
      "creation_date": "2021-05-02",
      "reviews": 2,
    },
  ]
  
  return (
    <div>
        <div class="background"></div>
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