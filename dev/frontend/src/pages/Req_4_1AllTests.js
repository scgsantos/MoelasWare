import { useEffect, useState } from 'react';
import logoMoelasWare from '../logoMoelasWare.png';
import Radiobutton from '../components/Radiobutton';
import { useParams, useNavigate } from "react-router-dom";
import SingleTestPage from './Req_4_1SingleTest';
import './TestSelection.css';
import HeaderComp from '../components/Header';
import Button from '../components/Button';

function MainSelectionPage() {
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState();
    const [error, setError] = useState("");
    const [selectedTags, setSelectedTags] = useState("random");
    const [selectedTest, setSelectedTest] = useState();

    const {test } = useParams();
    const navigate = useNavigate();
    function getTests() {
        fetch('http://localhost:8000/api/tests', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const testsArray = data.tests;
            setTests(testsArray);
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

                <div className="centerLoad">
                    <span>{error}</span>
                </div>
            </div>
        )
    }

    if(selectedTest) {
        return (
            <SingleTestPage test={selectedTest}/>
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
                    <Radiobutton text={"random"} selected={"random" === selectedTags} onClick={() => setSelectedTags("random")} />
                    <Radiobutton text={"tag"} selected={"tag" === selectedTags} onClick={() => setSelectedTags("tag")} />
                    <Radiobutton text={"manual"} selected={"manual" === selectedTags} onClick={() => setSelectedTags("manual")} />
                </div>
            </div>
            
            {loading === true ? (
                <div className="centerLoad">
                    <span>Loading...</span>
                </div>
            ) : (
                <div className='line'>
                    {tests.map((test, i) => (
                        <div key={i} className="box-test">
                            <span className='testTitle'>Test #{i + 1} - {test.quizzes[0].tags[0].text
                            }</span>
                            <Button onClick={()=>{
                                navigate(`/selecttest/${test.id}`);
                                setSelectedTest(test.id);
                            }} name={test.name}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainSelectionPage;
