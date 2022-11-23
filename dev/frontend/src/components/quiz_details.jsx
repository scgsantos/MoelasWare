import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MyQuiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [reviews, setReviews] = useState([
        ["user1", "approved", "justification"],
        ["user2", "approved", "justification"],
        ["user3", "rejected", "justification"],
    ]);

    const navigate = useNavigate();

    const { id } = useParams();

    const quizzes_link = "http://127.0.0.1:8000/api/quizzes/" + id + "/";

    useEffect(() => {
        fetch(quizzes_link, {
            method: "get",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                setQuizzes(data.quiz);
                setAnswers(data.answers);
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
