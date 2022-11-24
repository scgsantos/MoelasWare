import React, { Component } from 'react';
import API from "api.js";
import Drafts from 'pages/create_a_quiz/Drafts';

function MyDraft() {

    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


  sendQuizId = () => {
    API.sendQuizId(this.props.id)
      .then((data) => {
        console.log(this.props.id)
      })
  };
  return (
    <div
        role="button"
        className="mydraft-wrapper"
        onClick={() => navigate(-1)}
    >
        <div className="mydraftbox">
            <div
                role="button"
                className="mydraft"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{quizzes[1]}</h2>
                <p id="tag">{quizzes[3]}</p>
                <h3>QUESTIONS</h3>
                <p id="question">{quizzes[4]}</p>
                <p id="description">({quizzes[5]})</p>
                <div className="answers">{options}</div>
                <div className="reviews">
                    <h3>REVIEWS</h3>
                    {evaluations}
                </div>
            </div>
        </div>
    </div>
);
    return (
      <div className="unfinishedQuizzes-row">
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1 }}>
          <div className="unfinishedQuizzes-column">
            <text className='unfinishedQuizzes-esq'>
              <button class="unfinishedQuizzes-link-btn" onClick={() => this.sendQuizId(this.props.id)}>{this.props.name}</button>
            </text>
          </div>
        </div>
        <div style={{ flex: 17 }}></div>
        <div style={{ flex: 4 }}>
          <div className="unfinishedQuizzes-column">
            <text className='unfinishedQuizzes-right'>
              {this.props.time}
            </text>
          </div>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }

export default MyDraft;

function MyQuiz() {


  
    return (
        <div
            role="button"
            className="myquiz-wrapper"
            onClick={() => navigate(-1)}
        >
            <div className="myquizbox">
                <div
                    role="button"
                    className="myquiz"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>{quizzes[1]}</h2>
                    <p id="tag">{quizzes[3]}</p>
                    <h3>QUESTIONS</h3>
                    <p id="question">{quizzes[4]}</p>
                    <p id="description">({quizzes[5]})</p>
                    <div className="answers">{options}</div>
                    <div className="reviews">
                        <h3>REVIEWS</h3>
                        {evaluations}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyQuiz;

