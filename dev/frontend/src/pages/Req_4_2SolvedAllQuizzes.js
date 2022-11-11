import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderComp from '../components/Header';
import './TestSelection.css';
import utils from '../utils';

function QuestionSolving(props) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const { test } = useParams();


    useEffect(() => {
        document.title = "Test Solving";
        console.log(location.state);
        if (!location.state) {
            //TODO: need to make a request to get the grade of the test given.

        }
    })


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
                    }}>Ok</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeaderComp />

            <div className="centerTitles">
                <span className='main-title'>TEST #{location.state.id}</span>
                <span className='sub-title'>You have solved all the quizzes in this test.</span>
            </div>
            <div className="quizcenter mt-2">
                <span className='sub-title mt-2'>Your final test grade was</span>
                <span className='main-name mt-2'>{location.state.grade}</span>
            </div>

            <div className="bottomcenterntns mt-10">
                <button onClick={() => {
                    navigate('/solved/' + test);

                }}>Check the answers</button>
                <button onClick={() => {
                    navigate('/selecttest');
                }}>Back to test selection</button>
            </div>

        </div>
    );
}

export default QuestionSolving;