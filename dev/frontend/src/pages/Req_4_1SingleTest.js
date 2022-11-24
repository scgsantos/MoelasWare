import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import HeaderComp from '../components/Header';
import './TestSelection.css';
import utils from '../utils';

function SingleTestPage(props) {
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
        fetch(utils.svurl + 'api/tests/' + test, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTestinfo(data.test);
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
                <HeaderComp />
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
            <HeaderComp />

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
                        <span className='main-name'>{testinfo.quizzes[0].question}</span>
                        <span className='sub-name'>{testinfo.quizzes[0].tags[0].text}</span>
                    </div>

                    <div className="quizbottom">
                        <button className='solve-quizbtn' onClick={() => {
                            console.log('/solvequizz/' + testinfo.id);
                            navigate('/solvequizz/' + testinfo.id);
                        }}>Solve quiz</button>

                        <button className='back-btn' onClick={() => {
                            navigate('/selecttest');
                            window.location.reload();
                        }}>Back to test selection</button>
                    </div>
                </>
            )}

        </div>
    );
}

export default SingleTestPage;
