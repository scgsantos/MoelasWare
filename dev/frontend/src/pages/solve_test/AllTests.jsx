import { useEffect, useState } from 'react';
import Radiobutton from 'components/Radiobutton.jsx';
import { useParams, useNavigate } from "react-router-dom";
import SingleTestPage from 'pages/solve_test/SingleTest.jsx';
import 'pages/solve_test/TestSelection.css';
import Button from 'components/Button.jsx';
import config from 'config.js';
import { SELECT_TEST_URL, TEST_GRADE_URL } from "urls.js";

function MainSelectionPage() {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState();
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState("manual");
  const [selectedTest, setSelectedTest] = useState();

  const { test } = useParams();
  const navigate = useNavigate();
  function getTests() {
    setLoading(true); // important!

    fetch(config.svurl + 'api/tests?' + new URLSearchParams({
      'includeMySubmissions': true,
    }), {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTests(data.tests);
      }).catch(error => {
        console.log(error);
        setError("Error loading tests");
      }).finally(() => {
        setLoading(false);
      });
  }


  useEffect(() => {
    document.title = "Test Selection";
    setSelectedTest(test);
    getTests();
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
          <button className='TestSelection-solve-quizbtn mt-2' onClick={() => {
            setError(null);
            getTests();
          }}>Ok</button>
        </div>
      </div>
    )
  }

  if (selectedTest) {
    return (
      <SingleTestPage test={selectedTest} />
    )
  }

  return (
    <div>
      <div className="TestSelection-centerTitles">
        <span className='TestSelection-main-title'>SOLVE A TEST</span>
        <span className='TestSelection-sub-title'>Please choose the test you would like to take</span>
        <div className="TestSelection-radio-buttons mt-2">
          <span className="TestSelection-f-text">Filters</span>
          <Radiobutton text={"random"} selected={"random" === selectedTags} onClick={() => {
            setSelectedTags("random")
            // mix the tests order
            const newtests = tests.sort(() => Math.random() - 0.5);
            setTests(newtests);
          }} />
          <Radiobutton text={"tag"} selected={"tag" === selectedTags} onClick={() => {
            let newtests = tests.sort(() => Math.random() - 0.5);
            setSelectedTags("tag")
            // a test has a list of tags, we need to sort by alphabetical order
            newtests = newtests.sort((a, b) => {
              if (a.tags.length === 0) return 1;
              if (b.tags.length === 0) return -1;
              return a.tags[0].name.localeCompare(b.tags[0].name);
            });
            setTests(newtests);
          }} />
          <Radiobutton text={"manual"} selected={"manual" === selectedTags} onClick={() => {
            setSelectedTags("manual")
            // restore the tests order
            const newtests = tests.sort((a, b) => a.id - b.id);
            setTests(newtests);
          }} />
        </div>
      </div>

      {loading === true ? (
        <div className="TestSelection-centerLoad">
          <span>Loading...</span>
        </div>
      ) : (
        tests.length === 0 ? (
          <div className="TestSelection-centerLoad">
            <span>No tests available</span>
          </div>) : (
          <div className='TestSelection-line'>
            {tests.map((test, i) => (
              < div key={i} className='TestSelection-box-text'>
                <span className={`testTitle ${test.submissions.length > 0 ? 'disabled-text' : ''}`}>Test #{test.id} - {test.quizzes[0].tags[0].text
                }</span>
                <Button onClick={() => {
                  if (test.submissions.length > 0) {
                    navigate(`${TEST_GRADE_URL}/${test.id}/result`);
                    return;
                  }
                  navigate(`${SELECT_TEST_URL}/${test.id}`);
                  setSelectedTest(test.id);
                }} name={test.name} disabled={test.submissions.length > 0} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default MainSelectionPage;
