import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import HeaderComp from '../components/Header';
import './Req_4_2_2.css';
import './TestSelection.css';

function QuestionSolving() {

    const [test, setTest] = useState(undefined);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const { quizz } = useParams();

    useEffect(() => {
        document.title = "Test Solving";
        getTest(test);
    })

    function getTest(testid) {
        fetch('http://localhost:8000/api/tests/'+ testid, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.test);
            setTest(data.test);
            setError(null);
        }).catch(error => {
            console.log(error);
            setError("Error loading test");
        }).finally(() => {
            setLoading(false);
        });
    }

    if (error) {
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
            
            <div className="center">
                <h3>TEST #2 NAME</h3>

                <h6 class="hh">You have solved all the quizzes in this test</h6>


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