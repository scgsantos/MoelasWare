import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import 'pages/solve_test/TestSelection.css';
import config from 'config.js';
import { SELECT_TEST_URL } from "urls.js";

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
    setError("");
    fetch(config.svurl + "api/tests/" + test + "/grade", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setGrade(data.grade);
      }).catch(error => {
        console.log(error);
        setError("Error: " + error);
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    document.title = "Solved Test " + test;
    console.log(location.state);
    if (!location.state) {
      //TODO: need to make a request to get the grade of the test given.
      getGrade();
    }
  }, []);


  if (error) {
    return (
      <div>
        <div className="TestSelection-centerTitles">
          <span className='TestSelection-main-title'>SOLVE A TEST</span>
          <span className="TestSelection-sub-title">Something Wrong Happened</span>
        </div>

        <div className="TestSelection-centerLoad just-column">
          <span>{error}</span>
          <button className='TestSelection-solve-quizbtn' onClick={() => {
            setError(null);
          }}>Ok</button>
        </div>
      </div>
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
          <span className='TestSelection-main-name mt-2'>{location.state ? location.state.grade : grade} %</span>
        </div>

        <div className="TestSelection-bottomcenterntns mt-10">
          <button onClick={() => {
            navigate('/solved/' + test);

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
