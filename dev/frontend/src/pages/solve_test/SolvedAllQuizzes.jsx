import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import 'pages/solve_test/TestSelection.css';
import config from 'config.js';
import { SELECT_TEST_URL } from "urls.js";
import ErrorCompPage from 'components/Errors/errorCompSolveTest';
import API from 'api';

function QuestionSolving(props) {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { test } = useParams();

  function getGrade() {
    setLoading(true);
      API.getTestSubmissions(test).then((data) => {
        if (data.error) {
          setError("Error: " + data.error);
        }
        setGrade(data.grade);
      }).catch((error) => {
        setError("Error: " + error);
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    document.title = "Solved Test Grade" + test;
    // console.log(location.state);
    if (!location.state) {
      getGrade();
    }
  }, []);
  // console.log(error);

  if (error) {
    return (
     <ErrorCompPage
        error={error}
        resetError={() => {
          setError("")
          getGrade();
        }}
      />
    )
  }

  return (
    (loading === true) ? (
      <div className="TestSelection-centerLoad">
        <span>Loading...</span>
      </div>
    ) : (
      <div>
        <div className="TestSelection-centerTitles">
          <span className='TestSelection-main-title'>TEST #{test}</span>
          <span className='TestSelection-sub-title'>You have solved all the quizzes in this test.</span>
        </div>
        <div className="TestSelection-quizcenter mt-2">
          <span className='TestSelection-sub-title mt-2'>Your final test grade was</span>
          <span className='TestSelection-main-name mt-2'>{location.state ? Math.round(location.state.grade) : Math.round(grade)}%</span>
        </div>

        <div className="TestSelection-bottomcenterntns mt-10">
          <button onClick={() => {
            navigate('/test/solved/' + test);

          }}>Check the answers</button>
          <button onClick={() => {
            navigate(SELECT_TEST_URL);
          }}>Back to test selection</button>
        </div>

      </div>
    )
  );
}

export default QuestionSolving;
