import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import 'pages/solve_test/TestSelection.css';

import config from 'config.js';
import { SELECT_TEST_URL } from "urls.js";
import ErrorCompPage from 'components/Errors/errorCompSolveTest';
import API from 'api';

function CheckAnswers() {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

  const [quizzRes, setQuizzRes] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { test } = useParams();

  function isbtnSelected(quizz_id, answerid) {
    // check if given this json
    /* "answers": {
        "quizz_id": [2,3], # list of correct answers
        "quizz_id2": [1] # list of correct answers
    } */
    // if the answer is correct
    return quizzRes.answers[quizz_id].includes(answerid);
  }

  function isbtnCorrect(quizz_id, answerid) {
    // if the answer is correct
    /*
    given here:
    quizzRes.quizzes[quizz_id].answers has the flag correct set to true
    */
    const quizz = quizzRes.quizzes.find(q => q.id === quizz_id);
    return quizz.answers.find((answer) => answer.id === answerid).correct;
  }

  function getQuizzRes() {
    setLoading(true);
    API.getAllTestSubmissions(test).then((data) => {
      let answer = []; /* quiz_id: 0, answers: [] */
      data.quizzes.forEach((question) => { answer.push({ quiz_id: question.id, quiz_answers: [] }) });
      setQuizzRes(data); // questions and stuff
      setError(null);
    }).catch((error) => {
      console.log(error);
      setError("Error: " + error);
    }).finally(() => {
      setLoading(false);
    });
  }


  useEffect(() => {
    if (!quizzRes) {
      getQuizzRes();
      document.title = "Test " + test + " Resolution";
    }

  }, []);

  if (error || !quizzRes) {
    return (
      <ErrorCompPage
        resetError={() => {
          setError(null);
          getQuizzRes();
        }}
        error={error}
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
            <span className='TestSelection-main-title'>{`Test #${test}`}</span>
            <span className='TestSelection-sub-title'>Solve the quiz bellow to finish the test</span>
          </div>

          <div className="TestSelection-columnQuestions">
            {quizzRes.quizzes.map((quizz, j) => (
              <div className='TestSelection-question' key={j}>
                <span className='TestSelection-sub-title-b mb-2'>{`Question #${j + 1}`}</span>
                <span className='TestSelection-sub-title-b mb-2'>{`Pergunta: ${quizz.question}`}</span>
                <div className='TestSelection-center_tab'>
                  {quizz.answers.map((answer, i) => (
                    i === 0 && quizz.answers.length === 1 ? (
                      <button key={i} className={`btnlist button_uniq ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''} ${isbtnCorrect(quizz.id, answer.id) ? 'correct' : ''}`}>
                        {answer.text}
                      </button>
                    ) : i === 0 && quizz.answers.length > 0 ? (
                      <button key={i} className={`btnlist buttoncorners ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''} ${isbtnCorrect(quizz.id, answer.id) ? 'correct' : ''}`}>
                        {answer.text}
                      </button>
                    ) : i > 0 && i !== quizz.answers.length - 1 ? (
                      <button key={i} className={`btnlist other_buttons ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''} ${isbtnCorrect(quizz.id, answer.id) ? 'correct' : ''}`}>
                        {answer.text}
                      </button>
                    ) : i === quizz.answers.length - 1 ? (
                      <button key={i} className={`btnlist button_end ${isbtnSelected(quizz.id, answer.id) ? 'selected' : ''} ${isbtnCorrect(quizz.id, answer.id) ? 'correct' : ''}`}>
                        {answer.text}
                      </button>
                    ) : null
                  ))}

                </div>
              </div>
            ))}
          </div>

          <div className="TestSelection-bottomcenterntns">
            <button onClick={() => {
              navigate(SELECT_TEST_URL);
            }}>Back to test selection</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckAnswers;
