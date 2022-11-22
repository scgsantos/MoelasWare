import 'pages/review_quiz/ReviewQuizPage.css';
import logo from 'assets/SVG/LOGO.svg';
import { useNavigate } from "react-router-dom";
import React from 'react';
import { REVIEW_QUIZ_URL } from "urls.js";

function ReviewQuizPage() {
  document.documentElement.style.setProperty("--base", "var(--green)");

  let navigate = useNavigate();
  const data = [["Quiz #1", "Tag", "Name of creater", "Creation date", "X/3", 1],
  ["Quiz #2", "Tag", "Name of creater", "Creation date", "X/3", 2],
  ["Quiz #3", "Tag", "Name of creater", "Creation date", "X/3", 3],
  ["Quiz #4", "Tag", "Name of creater", "Creation date", "X/3", 4],
  ["Quiz #5", "Tag", "Name of creater", "Creation date", "X/3", 5],
  ["Quiz #6", "Tag", "Name of creater", "Creation date", "X/3", 6],
  ["Quiz #7", "Tag", "Name of creater", "Creation date", "X/3", 7],
  ["Quiz #8", "Tag", "Name of creater", "Creation date", "X/3", 8]];
  return (
    <div className='ReviewQuizPage-Container'>
      <div className='center'>
        <h2>LIST OF QUIZZES FOR REVIEW</h2>
        <p>Please click on the quiz that you would like review</p>
      </div>
      <div className='center_tab'>
      <tr className='center'>
        <td width={200}>QUIZ NAME</td>
        <td width={200}>TAGS</td>
        <td width={200}>NAME OF CREATER</td>
        <td width={200}>CREATION DATE</td>
        <td width={200}>REVIEWS</td>
      </tr>
        <ul className='pad'>
          {(() => {
            var d = [];
            for (let i = 0; i < data.length; i++) {
              if (i === 0 && data.length === 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_uniq button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][5]) }}>
                      <td width={200}>{data[i][0]}</td>
                      <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][4]}</td>
                    </button>
                  </tr>)
              } else if (i === 0 && data.length > 0) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button1 button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][5]) }}>
                      <td width={200}>{data[i][0]}</td>
                      <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][4]}</td>
                    </button>
                  </tr>)
              } else if (i > 0 && i !== data.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab other_buttons button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][5]) }}>
                      <td width={200}>{data[i][0]}</td>
                      <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][4]}</td>
                    </button>
                  </tr>)
              } else if (i === data.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_end button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + data[i][5]) }}>
                      <td width={200}>{data[i][0]}</td>
                      <td width={200}>{data[i][1]}</td>
                      <td width={200}>{data[i][2]}</td>
                      <td width={200}>{data[i][3]}</td>
                      <td width={200}>{data[i][4]}</td>
                    </button>
                  </tr>)
              }
            }
            return d;
          })()}
        </ul>
      </div>
    </div>
  )
};

export default ReviewQuizPage;
