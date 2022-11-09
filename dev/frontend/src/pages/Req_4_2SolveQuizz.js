import { useEffect, useState } from 'react';
import HeaderComp from '../components/Header';
import { useParams, useNavigate } from 'react-router';

import './TestSelection.css';

function SolveQuizz() {
    const navigate = useNavigate();
    const [quizzInfo, setQuizzQuestions] = useState();
    const [loading, setLoading] = useState(true);


    const { quizz } = useParams();


    function submitAnswers() {
        console.log("submitAnswers Not implemented yet");
    }

    function getQuizzQuestions() {
        fetch('http://localhost:8000/api/quizzes/' + quizz, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuizzQuestions(data);
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

            {loading === true ? (
                <div className="centerLoad">
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    <div className="centerTitles">
                        <span className='main-title'>{quizzInfo.name ? quizzInfo.name : `Quizz #${quizz} Name`}</span>
                        <span className='sub-title'>Solve the quiz bellow to finish the test</span>
                    </div>

                    <div className="columnQuestions">
                            {quizzInfo.quizzes.map((quizz, i) => (
                                <div className='question' key={i}>
                                    <span className='sub-title-b mb-2'>{`Question #${i + 1}`}</span>
                                    <span className='sub-title-b mb-2'>{`Pergunta: ${quizz.question}`}</span>
                                    {
                                        quizz.answers.map((answer, j) => (
                                            <button key={j}>{answer.text}</button>
                                        ))
                                    }
                                </div>
                            ))}
                    </div>


                    <div className="centro">
                        <button onClick={submitAnswers}>Submit answers</button>
                        <button onClick={() => {
                            navigate('/selecttest');
                            window.location.reload();
                        }}>Back to test selection</button>
                    </div>

                </>


            )}
        </div>

    );
}

export default SolveQuizz;
