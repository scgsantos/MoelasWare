import 'pages/review_quiz/ReviewQuizPage.css';
import React from 'react';
import { REVIEW_QUIZ_URL } from "urls.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from 'api.js';

function ReviewQuizPage() {
  document.documentElement.style.setProperty("--base", "var(--green)");

  const [data, setData] = useState([]);
  //error
  const [error, setError] = useState(false);
  //loading
  const [isLoaded, setLoading] = useState(false);

  const [isValid, setIsValid] = useState(false);

  let navigate = useNavigate();

  //fetch quiz from the backend and log it to the console
  useEffect(() => {
    API.getvalid()
    .then(
      (data) => {
        if (data["valid"] === 1) {
          setIsValid(true);
        }
        else {
          return;
        }
      }
    )

    API.getQuizzesOfReviewer()
    .then(
        (data) => {
          setLoading(true);
          setError(data.error);
          if (!data.error){
            setData(data.info);
          }
        })
  }, []);

  return (
    <div className='ReviewQuizPage-Container'>
      <div className='center'>
        <h2>LIST OF QUIZZES FOR REVIEW</h2>
        <p>Please click on the quiz that you would like review</p>
      </div>
      <div className='center_tab'>
      {(() => {
        var array = [];
            if (!error) {
              array.push(
              <tr className='center'>
              <td width={200}>QUIZ NAME</td>
              <td width={200}>TAGS</td>
              <td width={200}>CREATOR</td>
              <td width={200}>CREATION DATE</td>
              <td width={200}>REVIEWS</td>
              </tr>)
            }
            return array;
          })()}

        <ul className='pad'>
          {
          (() => {
            if(!isValid) {
              return <ul className="pad" style={{"marginTop":"100px"}}>You must create a quiz before reviewing one</ul>;
            } else if (error) {
              return <ul className="pad" style={{"marginTop":"100px"}}>There are no quizzes to review</ul>;
            } else if (!isLoaded) {
              return <ul className="pad" style={{"marginTop":"100px"}}>Loading...</ul>;
            } else {
            var d = [];
            for (let i = 0; i < data.length; i++) {
              if (i === 0 && data.length === 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_uniq button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][0]) }}>
                      <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][5]}</td>
                      <td width={200}>{3 - data[i][4]}/3</td>
                    </button>
                  </tr>)
              } else if (i === 0 && data.length > 0) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button1 button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][0]) }}>
                    <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][5]}</td>
                      <td width={200}>{3 - data[i][4]}/3</td>
                    </button>
                  </tr>)
              } else if (i > 0 && i !== data.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab other_buttons button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][0]) }}>
                    <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][5]}</td>
                      <td width={200}>{3 - data[i][4]}/3</td>
                      </button>
                  </tr>)
              } else if (i === data.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_end button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][0]) }}>
                    <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][5]}</td>
                      <td width={200}>{3 - data[i][4]}/3</td>
                    </button>
                  </tr>)
              }
            }
            return d;
          }
          })()}
        </ul>
      </div>
    </div>
  )
};

export default ReviewQuizPage;
