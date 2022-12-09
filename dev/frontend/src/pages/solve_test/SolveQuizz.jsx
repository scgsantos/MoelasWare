import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import config from 'config.js';
import Popup from 'reactjs-popup';

import { SELECT_TEST_URL, TEST_GRADE_URL } from "urls.js";

import 'pages/solve_test/TestSelection.css';
import { PopupInside } from 'components/Errors/PopupStopTest.jsx';
import ErrorCompPage from 'components/Errors/errorCompSolveTest';
import API from 'api';


const contentStylePopup = {
  maxWidth: "650px",
  width: "80%",
}

function SolveQuizz() {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

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
    /* if (checkEmptyAnswers()) {
      console.log("empty answers");
      setopenNoAnswers(true);
      return;
    } */
    // check if there are more than 1 answer for a question
    if (checkMoreThanTwoAnswers()) {
      console.log("more than 1 answer");
      setopenMoreThanOne(true);
      return;
    }
    setLoading(true);
    console.log(submissionAnswers);

    // transform the submissionAnswers to the correct format, by making quiz_answers an integer
    let subCorrectFormat = submissionAnswers;
    subCorrectFormat.forEach((answer) => {
      answer.quiz_answers = answer.quiz_answers[0];
    });

    API.postSubmission(test, subCorrectFormat).then((data) => {
      navigate(`${TEST_GRADE_URL}/${test}/result`, {
        state: {
          grade: data.grade,
          id: test
        }
      });
    }).catch((error) => {
      setError("Error: " + error);
    }).finally(() => {
      setLoading(false);
    });
  }

  function getQuizzQuestions() {
    setLoading(true);
    API.getQuiz(test)
    .then((data) => {
      let answer = []; /* quiz_id: 0, answers: [] */
      data.quizzes.forEach((question) => { answer.push({ quiz_id: question.id, quiz_answers: [] }) });
      setQuizzQuestions(data);

      // if not, they are already in the localstorage
      if (submissionAnswers === null || submissionAnswers === undefined) {
        setSub(answer);
      }
    }).catch((error) => {
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
    // console.log(localStorage.getItem('subs#' + test));

    setRerender(false);
  }, []);

  if (error) {
    return (
      <ErrorCompPage
        error={error}
        resetError={() => {
          setError(null)
          // reload the page
          window.location.reload();
        }}
      />
    )
  }
  return (
    <div>
      {loading === true ? (
        <div className="TestSelection-centerLoad">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="TestSelection-centerTitles">
            <span className='TestSelection-main-title'>{quizzInfo.quizzes[0].name ? quizzInfo.quizzes[0].name : `Quizz #${test}`}</span>
            <span className='TestSelection-sub-title'>Solve the quiz bellow to finish the test</span>
          </div>

          <div className="TestSelection-columnQuestions">
            {quizzInfo.quizzes.map((quizz, j) => (
              <div className='TestSelection-question' key={j}>
                <span className='TestSelection-sub-title-b mb-2'>{`Question #${j + 1}`}</span>
                <span className='TestSelection-sub-title-b mb-2'>{`Pergunta: ${quizz.question}`}</span>
                <div className='TestSelection-center_tab'>
                  {quizz.answers.map((answer, i) => (
                    i === 0 && quizz.answers.length === 1 ? (
                      <button key={i} className={
                        `TestSelection-btnlist TestSelection-button_uniq ${isbtnSelected(quizz.id, answer.id) ? 'TestSelection-selected' : ''}`}
                        onClick={() => {
                          addAnswer(answer.id, quizz.id)
                          setRerender(!rerender); // to update classNames
                        }}>
                        {answer.text}
                      </button>
                    ) : i === 0 && quizz.answers.length > 0 ? (
                      <button key={i} className={
                        `TestSelection-btnlist TestSelection-buttoncorners ${isbtnSelected(quizz.id, answer.id) ? 'TestSelection-selected' : ''}`}
                        onClick={() => {
                          addAnswer(answer.id, quizz.id)
                          setRerender(!rerender);
                        }}>
                        {answer.text}
                      </button>
                    ) : i > 0 && i !== quizz.answers.length - 1 ? (
                      <button key={i} className={
                        `TestSelection-btnlist TestSelection-other_buttons ${isbtnSelected(quizz.id, answer.id) ? 'TestSelection-selected' : ''}`}
                        onClick={() => {
                          addAnswer(answer.id, quizz.id)
                          setRerender(!rerender);
                        }}>
                        {answer.text}
                      </button>
                    ) : i === quizz.answers.length - 1 ? (
                      <button key={i} className={
                        `TestSelection-btnlist TestSelection-button_end ${isbtnSelected(quizz.id, answer.id) ? 'TestSelection-selected' : ''}`}
                        onClick={() => {
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

          <div className="TestSelection-bottomcenterntns">
            <button className='TestSelection-button' onClick={() => {
              console.log("gdfehwfhjds");
              submitAnswers();
            }}>Submit answers</button>
            <Popup
              position="center center"
              modal
              contentStyle={contentStylePopup}
              open={openNoAnswers}
              onClose={() => {
                setopenNoAnswers(false);
              }}
            >
              {close => (
                <PopupInside onClick={() => {
                  setopenNoAnswers(false)
                }} close={close} title={"You still have unanswered questions."} singleButton={true} />
              )}
            </Popup>

            <Popup
              position="center center"
              modal
              contentStyle={contentStylePopup}
              open={openMoreThanOne}
              onClose={() => {
                setopenMoreThanOne(false);
              }}
            >
              {close => (
                <PopupInside onClick={() => {
                  setopenMoreThanOne(false)
                }} close={close} title={"You can't select more than two answers."} singleButton={true} />
              )}
            </Popup>

            <Popup trigger={
              <button className='TestSelection-button'>Back to test selection</button>
            } position="center center"
              modal
              contentStyle={contentStylePopup}
            >
              {close => (
                <PopupInside onClick={() => {
                  navigate(SELECT_TEST_URL);
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
