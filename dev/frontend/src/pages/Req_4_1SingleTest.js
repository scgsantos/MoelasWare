import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import './TestSelection.css';
import utils from '../utils';
import { SELECT_TEST_URL, SOLVE_TEST_URL } from "../urls.js";

function SingleTestPage(props) {
    document.body.style = "background: var(--yellow)";

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
        fetch(utils.svurl + '/api/tests/' + test, {
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
                <div className="centerTitles">
                    <span className='main-title'>SOLVE A TEST</span>
                    <span className="sub-title">Something Wrong Happened</span>
                </div>

                <div className="centerLoad">
                    <span>{error}</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            {loading ? (
                <div className="centerLoad">
                    <span>Loading...</span>
                </div>
            ) : (
                <>
                    <div className="centerTitles">
                        <span className='main-title'>{testinfo.name}</span>
                        <span className='sub-title'>Solve the quiz bellow to finish the test</span>
                    </div>

                    <div className="quizcenter">
                        <span className='main-name'>{testinfo.quizzes[0].name}</span>
                        <span className='sub-name'>{testinfo.quizzes.reduce((acc, quiz) => {
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

                    <div className="quizbottom">
                        <button className='solve-quizbtn' onClick={() => {
                            navigate(`${SOLVE_TEST_URL}/${testinfo.id}`);
                        }}>Solve quiz</button>

                        <button className='back-btn' onClick={() => {
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
