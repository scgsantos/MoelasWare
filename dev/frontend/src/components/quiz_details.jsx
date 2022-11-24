import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "api.js";

function MyQuiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        API.getInfoQuiz(id).then((data) => {
            setQuizzes(data.quiz);
            setAnswers(data.answers);
            console.log(quizzes);
            console.log(answers);
        });
        API.getReviewsOfQuiz(id).then((data) => {
            setError(data.error);
            if (!data.error){
                setReviews(data.reviews);
            }
        });
    }, []);

    let options = [];
    for (let i = 0; i < answers.length; i++) {
        options.push(
            <React.Fragment>
                <p className="option-title">OPTION #{i + 1}:</p>
                <div className="options">
                    <p
                        key={"o" + i}
                        id="option"
                        className={answers[i][2] ? "correct" : "none"}
                    >
                        {answers[i][0]}
                    </p>
                </div>
                <div className="justifications">
                    <p key={"j" + i} id="justification">
                        ({answers[i][1]})
                    </p>
                </div>
            </React.Fragment>
        );
    }
    let reviews_list = [];
    if (!error){
    for (let i = 0; i < reviews.length; i++) {
        reviews_list.push(
            <React.Fragment>
                <p className="review-title">REVIEW #{i + 1}:</p>
                <div className="results">
                    <p
                        key={"r" + i}
                        id="result"
                        className={
                            reviews[i][4] === "accepted" ? "accepted" : "none"
                        }
                    >
                        {reviews[i][4]}
                    </p>
                </div>
                <div className="evaluations">
                    <p key={"e" + i} id="evaluation">
                        {reviews[i][2]}
                    </p>
                </div>
                <div>
                    <p key={"e" + i} id="evaluation">
                        {reviews[i][1]}
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

    let evaluations = [];
    for (let i = 0; i < reviews.length; i++) {
        evaluations.push(
            <React.Fragment>
                <p className="review-title">REVIEW #{i + 1}:</p>
                <p key={"r" + i} id="review">
                    {reviews[i][1]}
                </p>
                <p key={"e" + i} id="evaluation">
                    {reviews[i][2]}
                </p>
            </React.Fragment>
        );
    }

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
                    <h3>REVIEWS</h3>
                    <div className="reviews">{reviews_list}</div>
                </div>
            </div>
        </div>
    );
}

export default MyQuiz;
