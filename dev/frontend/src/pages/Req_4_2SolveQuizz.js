import { useEffect, useState } from 'react';
import HeaderComp from '../components/Header';
import { useParams, useNavigate, useLocation } from 'react-router';
import utils from '../utils';

import './TestSelection.css';

function SolveQuizz() {
    const navigate = useNavigate();
    const [quizzInfo, setQuizzQuestions] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionAnswers, setSub] = useState(null);
    const [rerender, setRerender] = useState(false); // used to trigger a rerender

    const { test } = useParams();

    function isbtnSelected(quizz_id, answerid) {
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
        return submissionAnswers && submissionAnswers.find((sub) => sub.quiz_id === quizz_id && sub.quiz_answers.includes(answerid)) ? true : false;
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
        const body = {
            "answers": submissionAnswers
        }
        // check if quiz_answers for every quiz_id is empty
        submissionAnswers.forEach((answer) => {
            if (answer.quiz_answers.length === 0) {
                setError("Please answer all questions");
                setLoading(false);
                return;
            }
        });

        console.log(JSON.stringify(body));
        fetch(utils.svurl + `/api/tests/${test}/submissions`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate(`/grade/${test}/result`, {
                    state: {
                        data: data,
                        test: quizzInfo
                    }
                });
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    function getQuizzQuestions() {
        setLoading(true);
        fetch(utils.svurl + '/api/quizzes/' + test, {
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
                data.quizzes.forEach((question) => { answer.push({ quiz_id: question.id, quiz_answers: [] }) });
                setSub(answer);
                setQuizzQuestions(data);
                setError(null);
                // for every answer in every quiz create a '' in the isActivated array
                let l = [];
                data.quizzes.forEach((question) => {
                    question.answers.forEach(() => {
                        l.push(false);
                    });
                });
            }).catch(error => {
                console.log(error);
                setError("Error: " + error);
            }).finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        if (!quizzInfo) {
            getQuizzQuestions();
            document.title = "Test " + test;
        }

    }, []);

    if (error || !quizzInfo) {
        return (
            <div>
                <HeaderComp />
                <div className="centerTitles">
                    <span className='main-title'>SOLVE A TEST</span>
                    <span className="sub-title">Something Wrong Happened</span>
                </div>

                <div className="centerLoad just-column mt-2">
                    <span>{error}</span>
                    <button className='solve-quizbtn mt-2' onClick={() => {
                        setError(null);
                    }}>Ok</button>
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
                        <span className='main-title'>{quizzInfo.name ? quizzInfo.name : `Quizz #${test} Name`}</span>
                        <span className='sub-title'>Solve the quiz bellow to finish the test</span>
                    </div>

                    <div className="columnQuestions">
                        {quizzInfo.quizzes.map((quizz, j) => (
                            <div className='question' key={j}>
                                <span className='sub-title-b mb-2'>{`Question #${j + 1}`}</span>
                                <span className='sub-title-b mb-2'>{`Pergunta: ${quizz.question}`}</span>
                                <div className='center_tab'>
                                    {quizz.answers.map((answer, i) => (
                                        i === 0 && quizz.answers.length === 1 ? (
                                            <button key={i} className={`btnlist button_uniq ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''}`} onClick={() => {
                                                addAnswer(answer.id, quizz.id)
                                                setRerender(!rerender); // to update classNames
                                            }}>
                                                {answer.text}
                                            </button>
                                        ) : i === 0 && quizz.answers.length > 0 ? (
                                            <button key={i} className={`btnlist buttoncorners ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''}`} onClick={() => {
                                                addAnswer(answer.id, quizz.id)
                                                setRerender(!rerender);

                                            }}>
                                                {answer.text}
                                            </button>
                                        ) : i > 0 && i !== quizz.answers.length - 1 ? (
                                            <button key={i} className={`btnlist other_buttons ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''}`} onClick={() => {
                                                addAnswer(answer.id, quizz.id)
                                                setRerender(!rerender);

                                            }}>
                                                {answer.text}
                                            </button>
                                        ) : i === quizz.answers.length - 1 ? (
                                            <button key={i} className={`btnlist button_end ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''}`} onClick={() => {
                                                addAnswer(answer.id, quizz.id)
                                                setRerender(!rerender);

                                            }}>
                                                {answer.text}
                                            </button>
                                        ) : null
                                    ))}

                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="centro">
                        <button onClick={submitAnswers}>Submit answers</button>
                        <button onClick={() => {
                            navigate('/selecttest');
                        }}>Back to test selection</button>
                    </div>

                </>


            )}
        </div>

    )
}

export default SolveQuizz;
