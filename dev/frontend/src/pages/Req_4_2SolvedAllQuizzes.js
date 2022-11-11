import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import HeaderComp from '../components/Header';
import './Req_4_2_2.css';
import './TestSelection.css';
import utils from '../utils';

function QuestionSolving() {

    const [test, setTest] = useState(undefined);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { location } = useLocation();
    const { testId } = useParams();


    useEffect(() => {
        document.title = "Test Solving";
        console.log(location.state)
        if (!location.state.test) {
            setError("Test not found in location state");
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
                <span className='main-title'>TEST { }</span>
                <span className='sub-title'>Please choose the test you would like to take</span>
            </div>
            <div className="grade">
                <h6>Your final test grade was</h6>
                <h3>TEST #2 grade</h3>
            </div>

            <div className="centro">
                <button href='/Req_4_2_3'>Check the answers</button>
                <button href='/Req_4_1_1'>Back to test selection</button>
            </div>

        </div>
    );
}

export default QuestionSolving;