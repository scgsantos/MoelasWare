import { useEffect, useState } from 'react';
import Radiobutton from '../components/Radiobutton';
import { useParams, useNavigate } from "react-router-dom";
import SingleTestPage from './Req_4_1SingleTest';
import './TestSelection.css';
import HeaderComp from '../components/Header';
import Button from '../components/Button';
import utils from '../utils';

function MainSelectionPage() {
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState();
    const [error, setError] = useState("");
    const [selectedTags, setSelectedTags] = useState("manual");
    const [selectedTest, setSelectedTest] = useState();

    const { test } = useParams();
    const navigate = useNavigate();
    function getTests() {
        fetch(utils.svurl + 'api/tests', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
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
                <HeaderComp />
                <div className="centerTitles">
                    <span className='main-title'>SOLVE A TEST</span>
                    <span className="sub-title">Something Wrong Happened</span>
                </div>

                <div className="centerLoad just-column">
                    <span>{error}</span>
                    <button className='solve-quizbtn' onClick={() => {
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
            <HeaderComp />

            <div className="centerTitles">
                <span className='main-title'>SOLVE A TEST</span>
                <span className='sub-title'>Please choose the test you would like to take</span>
                <div className="radio-buttons mt-2">
                    <span className="f-text">Filters</span>
                    <Radiobutton text={"random"} selected={"random" === selectedTags} onClick={() => {
                        setSelectedTags("random")
                        // mix the tests order
                        const newtests = tests.sort(() => Math.random() - 0.5);
                        setTests(newtests);
                    }} />
                    <Radiobutton text={"tag"} selected={"tag" === selectedTags} onClick={() => {
                        let newtests = tests.sort(() => Math.random() - 0.5);
                        setSelectedTags("tag")
                        // a test has a list of tags, we need to sort by the first tag
                        newtests = tests.sort((a, b) => {
                            if (a.tags[0] < b.tags[0]) {
                                return -1;
                            }
                            if (a.tags[0] > b.tags[0]) {
                                return 1;
                            }
                            return 0;
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
                <div className="centerLoad">
                    <span>Loading...</span>
                </div>
            ) : (
                tests.length === 0 ? (
                    <div className="centerLoad">
                        <span>No tests available</span>
                    </div>) : (
                    <div className='line'>
                        {tests.map((test, i) => (
                            <div key={i} className="box-test">
                                <span className='testTitle'>Test #{test.id} - {test.quizzes[0].tags[0].text
                                }</span>
                                <Button onClick={() => {
                                    navigate(`/selecttest/${test.id}`);
                                    setSelectedTest(test.id);
                                }} name={test.name} />
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default MainSelectionPage;
