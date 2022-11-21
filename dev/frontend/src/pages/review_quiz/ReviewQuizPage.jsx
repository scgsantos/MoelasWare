import 'pages/review_quiz/ReviewQuizPage.css';
import logo from 'assets/SVG/LOGO.svg';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, setState } from "react";
import React from 'react';
import { REVIEW_QUIZ_URL } from "urls.js";

function ReviewQuizPage() {
  document.documentElement.style.setProperty("--base", "var(--green)");

  let navigate = useNavigate();
  const quizzesHeader = ["QUIZ NAME", "TAG", "AUTHOR", "REVIEWS"];

  const [review, setReview] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/quizzes/review/1")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong", { cause: res });
        }
      })
      .then(
        (result) => {
          setReview(result.info);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
      ).catch((error) => {
      })
  }, [])

  console.log(review);

  return (
    <div className='ReviewQuizPage-Container'>
      <div className='center'>
        <h2>LIST OF QUIZZES FOR REVIEW</h2>
        <p>Please click on the quiz that you would like review</p>
      </div>
      <table className='center_tab'>
        <thead>
        <tr>
          {quizzesHeader.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
        </thead>
        <tbody>
          {(() => {
            var d = [];
            for (let i = 0; i < review.length; i++) {
              if (i === 0 && review.length === 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_uniq button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + review[i][0]) }}>
                      <td width={200}>{review[i][1]}</td>
                      <td width={200}>{review[i][2]}</td>
                      <td width={200}>{review[i][3]}</td>
                      <td width={200}>{3 - review[i][4]}/3</td>
                    </button>
                  </tr>)
              } else if (i === 0 && review.length > 0) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button1 button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + review[i][0]) }}>
                      <td width={200}>{review[i][1]}</td>
                      <td width={200}>{review[i][2]}</td>
                      <td width={200}>{review[i][3]}</td>
                      <td width={200}>{3 - review[i][4]}/3</td>
                    </button>
                  </tr>)
              } else if (i > 0 && i !== review.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab other_buttons button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + review[i][0]) }}>
                      <td width={200}>{review[i][1]}</td>
                      <td width={200}>{review[i][2]}</td>
                      <td width={200}>{review[i][3]}</td>
                      <td width={200}>{3 - review[i][4]}/3</td>
                    </button>
                  </tr>)
              } else if (i === review.length - 1) {
                d.push(
                  <tr className='select'>
                    <button className='button_tab button_end button_tab_hover' onClick={() => { navigate(REVIEW_QUIZ_URL + review[i][0]) }}>
                      <td width={200}>{review[i][1]}</td>
                      <td width={200}>{review[i][2]}</td>
                      <td width={200}>{review[i][3]}</td>
                      <td width={200}>{3 - review[i][4]}/3</td>
                    </button>
                  </tr>)
              }
            }
            return d;
          })()}
          </tbody>
      </table>
    </div>
  )
};

export default ReviewQuizPage;
