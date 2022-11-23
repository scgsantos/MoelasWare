import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import 'pages/solve_test/TestSelection.css';
import config from 'config.js';
import { SELECT_TEST_URL, SOLVE_TEST_URL } from "urls.js";

function SingleTestPage(props) {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

  const [testinfo, setTestinfo] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { test } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    document.title = "Test " + test;
    fetchTestInfo();
  }, []);


  function fetchTestInfo() {
    fetch(config.svurl + '/api/tests/' + test, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setTestinfo(data.test);

        /*
        "tests": [
{
    "id": 1,
    "author": 1,
    "quizzes": [
        {
            "id": 2,
            "name": "hello",
            "author": 1,
            "tags": [
                {
                    "text": "Cool"
                }
            ],
            "question": "Who wins in a fight vs a gorilla?",
            "description": "(serious answers only)"
        }
    ]
        */
        setError(null);
      }).catch(error => {
        console.log(error);
        setError("Error: " + error);
      }).finally(() => {
        setLoading(false);
      });
  }

  if (error || testinfo === undefined) {
    return (
      <div>
        <div className="TestSelection-centerTitles">
          <span className='TestSelection-main-title'>SOLVE A TEST</span>
          <span className="TestSelection-sub-title">Something Wrong Happened</span>
        </div>

        <div className="TestSelection-centerLoad">
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <div className="TestSelection-centerLoad">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <div className="TestSelection-centerTitles">
            <span className='TestSelection-main-title'>{testinfo.name}</span>
            <span className='TestSelection-sub-title'>Solve the quiz bellow to finish the test</span>
          </div>

          <div className="TestSelection-quizcenter">
            <span className='TestSelection-main-name'>{testinfo.quizzes[0].name}</span>
            <span className='TestSelection-sub-name'>{testinfo.quizzes.reduce((acc, quiz) => {
              // keep adding ", " to the accumulator
              // at the end, remove the last ", " 
              quiz.tags.forEach(tag => {
                if (!acc.includes(tag.text)) {
                  acc += tag.text + ", ";
                }
              });
              return acc;
            }, "").slice(0, -2)}</span>
          </div>

          <div className="TestSelection-quizbottom">
            <button className='TestSelection-solve-quizbtn' onClick={() => {
              navigate(`${SOLVE_TEST_URL}/${testinfo.id}`);
            }}>Solve quiz</button>

            <button className='TestSelection-back-btn' onClick={() => {
              navigate(SELECT_TEST_URL);
              window.location.reload();
            }}>Back to test selection</button>
          </div>
        </>
      )}

    </div>
  );
}

export default SingleTestPage;
