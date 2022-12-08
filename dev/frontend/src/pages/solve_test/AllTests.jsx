import { useEffect, useState } from 'react';
import Radiobutton from 'components/Radiobutton.jsx';
import { useParams, useNavigate } from "react-router-dom";
import SingleTestPage from 'pages/solve_test/SingleTest.jsx';
import 'pages/solve_test/TestSelection.css';
import Button from 'components/Button.jsx';
import config from 'config.js';
import { SELECT_TEST_URL, TEST_GRADE_URL } from "urls.js";
import API from 'api';
import ErrorCompPage from 'components/Errors/errorCompSolveTest';

function MainSelectionPage() {
  document.documentElement.style.setProperty("--base", "var(--yellow)");

  const [loading, setLoading] = useState(true);
  const [everythingTests, setEverythingTests] = useState();
  const [tests, setTests] = useState();
  const [error, setError] = useState("");
  // const [selectedTags, setSelectedTags] = useState("manual");
  const [selectedTest, setSelectedTest] = useState();

  const { test } = useParams();
  const navigate = useNavigate();
  
  function getTests() {
    setLoading(true); // important!
    API.getTestsMySub().then((data) => {
      setTests(data.tests);
      setEverythingTests(data.tests);
    }).catch((error) => {
      setError("Error: " + error);
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
      <ErrorCompPage resetError={() => {
        setError(null);
        getTests();
      }} error={error} />
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
        {/*  <div className="TestSelection-radio-buttons mt-2">
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
        </div> */}
      </div>
      <input className="TestSelection-search-box" type="text" placeholder="Search test by name or tag..." onChange={(e) => {
        if (e.target.value === "") {
          setTests(everythingTests);
          return;
        }
        // check by name and tag name
        const newtests = everythingTests.filter((test) => {
          return test.name.toLowerCase().includes(e.target.value.toLowerCase()) || test.quizzes[0].tags.some((tag) => tag.text.toLowerCase().includes(e.target.value.toLowerCase()));
        });
        setTests(newtests);
      }} />
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
                <span className={`TestSelection-testTitle ${test.submissions.length > 0 ? 'TestSelection-disabled-text' : ''}`}>Test #{test.id} - {test.quizzes[0].tags[0].text
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
