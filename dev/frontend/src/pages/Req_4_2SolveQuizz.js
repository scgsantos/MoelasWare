import { useEffect, useState } from 'react';
import HeaderComp from '../components/Header';
import { useParams, useNavigate } from 'react-router';

import './TestSelection.css';

function SolveQuizz() {
    const navigate = useNavigate();
    const [quizzInfo, setQuizzQuestions] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionAnswers, setSub] = useState(null);

    const { quizz } = useParams();

    function isbtnSelected(quizz_id, answerid, btntype) {
        /* "submissionAnswers": [
            {
                "quiz_id": 1, # pergunta
                "quiz_answers": [1, 2] # id's of the answers choosen
            },
            {
                "quiz_id": 2,
                "quiz_answers": [2] # id's of the answers choosen
            }
        ] */
        if (submissionAnswers) {
            for (let i = 0; i < submissionAnswers.length; i++) {
                console.log(submissionAnswers[i].quiz_id, quizz_id);
                if (submissionAnswers[i].quiz_id === quizz_id) {
                    if (submissionAnswers[i].quiz_answers.includes(answerid)) {
                        return 'btnlist selected '+btntype;
                    }
                }
            }
        }
        return 'btnlist '+btntype;
    }

    function addAnswer(answeridgiven, quiz_id) {
        /* "submissionAnswers": [
            {
                "quiz_id": 1, # pergunta
                "quiz_answers": [1, 2] # id's of the answers choosen
            },
            {
                "quiz_id": 2,
                "quiz_answers": [2] # id's of the answers choosen
            }
        ] */
        let sub = submissionAnswers;

        // add get the quizz_answers array
        let quizz_answers = [];
        submissionAnswers.forEach((answer) => {
            if (answer.quiz_id === quiz_id) {
                quizz_answers = answer.quiz_answers;
            }
        });

        // add the answer to the array, if not already there
        if (!quizz_answers.includes(answeridgiven)) {
            quizz_answers.push(answeridgiven);
        } else {
            // remove the answer from the array if already there
            quizz_answers = quizz_answers.filter((a) => a !== answeridgiven);
        }

        // update the submissionAnswers
        sub.forEach((answer) => {
            if (answer.quiz_id === quiz_id) {
                answer.quiz_answers = quizz_answers;
            }
        });

        console.log(sub);
        setSub(sub);
    }

    function submitAnswers() {
        setLoading(true);
        fetch(`http://localhost:8080/tests/${quizz}/submissions`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionAnswers)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate(`/quizz/${quizz}/results`);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    function getQuizzQuestions() {
        setLoading(true);
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
                let answer = []; /* quiz_id: 0, answers: [] */
                data.quizzes.forEach((question) => {answer.push({ quiz_id: question.id, quiz_answers: []})});
                setSub(answer);
                setQuizzQuestions(data);
                setError(null);
            }).catch(error => {
                console.log(error);
                setError("Error: " + error);
            }).finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        document.title = "Quizz " + quizz;
        getQuizzQuestions();
    }, []);

    if (error || !quizzInfo) {
        return (
            <div>
                <HeaderComp />
                <div className="centerTitles">
                    <span className='main-title'>SOLVE A TEST</span>
                    <span className="sub-title">Something Wrong Happened</span>
                </div>

                <div className="centerLoad">
                    <span>{error}</span>
                </div>
            </div>
        )
    }

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
                                <div className='center_tab'>
                                    {(() => {
                                        var d = [];
                                        for (let i = 0; i < quizz.answers.length; i++) {
                                            if (i === 0 && quizz.answers.length === 1) {
                                                d.push(
                                                    <button key={i} className={isbtnSelected(quizz.id, quizz.answers[i].id, 'button_uniq')} onClick={() => {
                                                        console.log("yo")
                                                        addAnswer(quizz.answers[i].id, quizz.id)
                                                    }}>
                                                        {quizz.answers[i].text}
                                                    </button>
                                                )
                                            } else if (i === 0 && quizz.answers.length > 0) {
                                                d.push(
                                                    <button key={i} className={isbtnSelected(quizz.id, quizz.answers[i].id, 'buttoncorners')} onClick={() => {
                                                        console.log("yo")
                                                        addAnswer(quizz.answers[i].id, quizz.id)
                                                    }}>
                                                        {quizz.answers[i].text}
                                                    </button>
                                                )
                                            } else if (i > 0 && i !== quizz.answers.length - 1) {
                                                d.push(
                                                    <button key={i} className={isbtnSelected(quizz.id, quizz.answers[i].id, 'other_buttons')} onClick={() => {
                                                        console.log("yo")
                                                        addAnswer(quizz.answers[i].id, quizz.id)
                                                    }}>
                                                        {quizz.answers[i].text}
                                                    </button>
                                                )
                                            } else if (i === quizz.answers.length - 1) {
                                                d.push(
                                                    <button key={i} className={isbtnSelected(quizz.id, quizz.answers[i].id, 'button_end')} onClick={() => {
                                                        console.log("yo")
                                                        addAnswer(quizz.answers[i].id, quizz.id)  
                                                    }}>
                                                        {quizz.answers[i].text}
                                                    </button>
                                                )
                                            }
                                        }
                                        return d;

                                    })()}
                                </div>

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
