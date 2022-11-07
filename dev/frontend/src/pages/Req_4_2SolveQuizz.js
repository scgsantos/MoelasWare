import { useEffect, useState } from 'react';
import HeaderComp from '../components/Header';
import { useParams, useNavigate } from 'react-router';

import './Req_4_2_1.css';
import './TestSelection.css';

function SolveQuizz(props) {
    const navigate = useNavigate();
    const [quizzinfo, setQuizzQuestions] = useState();
    const [loading, setLoading] = useState(true);


    const {quizz } = useParams();


    function submitAnswers(){
        console.log("submitAnswers Not implemented yet");
    }

    function getQuizzQuestions() {
        fetch('http://localhost:8000/api/quizzes/' + quizz+ '/anwsers/', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setQuizzQuestions(data.quizz);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        document.title = "Quizz " + quizz;
        getQuizzQuestions();
    }, []);

    return (
        <div>
            <HeaderComp />

            <div className="center">
                <h3>QUIZ #1 NAME</h3>
                <h7>Select the correct answer to each question</h7>
            </div>

            <div className="question">
                <h3>Question #1</h3>
                <h6>Pergunta: qual é o teu nome?</h6>
            </div>


            <div className="column">
                <button>Answer #1</button>
                <button>Answer #2</button>
                <button>Answer #3</button>
                <button>Answer #4</button>
                <button>Answer #5</button>
                <button>Answer #6</button>
            </div>

            <div className="question">
                <h3>Question #2</h3>
                <h6>Pergunta: qual é o teu nome?</h6>
            </div>


            <div className="column">
                <button>Answer #1</button>
                <button>Answer #2</button>
                <button>Answer #3</button>
                <button>Answer #4</button>
                <button>Answer #5</button>
                <button>Answer #6</button>
            </div>

            <div className="question">
                <h3>Question #3</h3>
                <h6>Pergunta: qual é o teu nome?</h6>
            </div>


            <div className="column">
                <button>Answer #1</button>
                <button>Answer #2</button>
                <button>Answer #3</button>
                <button>Answer #4</button>
                <button>Answer #5</button>
                <button>Answer #6</button>
            </div>

            <div className="centro">
                <button onClick={submitAnswers}>Submit answers</button>
                <button onClick={() => {
                    navigate('/selecttest');
                    window.location.reload();
                }}>Back to test selection</button>
            </div>


        </div>


    );
}

export default SolveQuizz;
