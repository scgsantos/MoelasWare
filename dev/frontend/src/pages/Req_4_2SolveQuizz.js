import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import utils from '../utils';
import Popup from 'reactjs-popup';


import './TestSelection.css';
import { PopupInside } from '../components/Errors/PopupStopTest';


const contentStylePopup = {
    maxWidth: "650px",
    width: "80%",
}

function SolveQuizz() {
    const navigate = useNavigate();
    const { test } = useParams();

    const [quizzInfo, setQuizzQuestions] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionAnswers, setSub] = useState(localStorage.getItem('subs#' + test) !== null || localStorage.getItem('subs#' + test) !== undefined ? JSON.parse(localStorage.getItem('subs#' + test)) : []);
    const [rerender, setRerender] = useState(false); // used to trigger a rerender
    const [openNoAnswers, setopenNoAnswers] = useState(false);
    const [openMoreThanOne, setopenMoreThanOne] = useState(false);

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
        console.log("isbtnSelected");
        console.log(submissionAnswers);
        return submissionAnswers && submissionAnswers.find((sub) => sub.quiz_id === quizz_id && sub.quiz_answers.includes(answerid));
    }

    function checkEmptyAnswers() {
        // if quiz_answers len is 0, then it's empty
        return submissionAnswers && submissionAnswers.find((sub) => sub.quiz_answers.length === 0);
    }

    function checkMoreThanTwoAnswers() {
        // if quiz_answers len is 0, then it's empty
        return submissionAnswers && submissionAnswers.find((sub) => sub.quiz_answers.length > 1);
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
        setSub(sub);
    }

    function submitAnswers() {
        localStorage.setItem('subs#' + test, JSON.stringify(submissionAnswers));

        // user can't submit if there are empty answers
        if (checkEmptyAnswers()) {
            setopenNoAnswers(true);
            return;
        }
        // check if there are more than 1 answer for a question
        if (checkMoreThanTwoAnswers()) {
            setopenMoreThanOne(true);
            return;
        }
        setLoading(true);

        // transform the submissionAnswers to the correct format, by making quiz_answers an integer
        let subCorrectFormat = submissionAnswers;
        subCorrectFormat.forEach((answer) => {
            answer.quiz_answers = answer.quiz_answers[0];
        });

        const body = {
            "answers": subCorrectFormat
        }
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
                navigate(`/grade/${test}/result`, {
                    state: {
                        grade: data.grade,
                        id: test
                    }
                });
            }).catch(error => {
                console.log(error);
                setError("Error: " + error);
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
                let answer = []; /* quiz_id: 0, answers: [] */
                data.quizzes.forEach((question) => { answer.push({ quiz_id: question.id, quiz_answers: [] }) });
                setQuizzQuestions(data);

                // if not, they are already in the localstorage
                if (submissionAnswers === null || submissionAnswers === undefined) {
                    setSub(answer);
                }
            }).catch(error => {
                console.log(error);
                setError("Error: " + error);
            }).finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        document.title = "Test " + test;
        if (!quizzInfo) {
            getQuizzQuestions();
        }
        console.log("fdlsçajkflçds");
        console.log(localStorage.getItem('subs#' + test));

        setRerender(false);
    }, []);

    if (error) {
        return (
            <div>
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
            {loading === true ? (
                <div className="centerLoad">
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    <div className="centerTitles">
                        <span className='main-title'>{quizzInfo.quizzes[0].name ? quizzInfo.quizzes[0].name : `Quizz #${test}`}</span>
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


                    <div className="bottomcenterntns">
                        <button className='button' onClick={() => {
                            submitAnswers();
                        }}>Submit answers</button>
                        <Popup
                            position="center center"
                            modal
                            contentStyle={contentStylePopup}
                            open={openNoAnswers}
                        >
                            {close => (
                                <PopupInside onClick={() => {
                                    setopenNoAnswers(o => !o)
                                }} close={close} title={"You still have unanswered questions."} singleButton={true} />
                            )}
                        </Popup>

                        <Popup
                            position="center center"
                            modal
                            contentStyle={contentStylePopup}
                            open={openMoreThanOne}
                        >
                            {close => (
                                <PopupInside onClick={() => {
                                    setopenMoreThanOne(o => !o)
                                }} close={close} title={"You can't select more than two answers."} singleButton={true} />
                            )}
                        </Popup>

                        <Popup trigger={
                            <button>Back to test selection</button>
                        } position="center center"
                            modal
                            contentStyle={contentStylePopup}
                        >
                            {close => (
                                <PopupInside onClick={() => {
                                    navigate('/selecttest');
                                    localStorage.setItem('subs#' + test, JSON.stringify(submissionAnswers));
                                }} close={close} title={"Do you wish to return to test selection?"} subtitle={"Your progress will be saved"} singleButton={false} />
                            )}
                        </Popup>
                    </div>

                </>


            )}
        </div>

    )
}

export default SolveQuizz;
