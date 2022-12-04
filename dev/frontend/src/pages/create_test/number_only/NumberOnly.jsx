import React, { useState } from "react";
import IncDecCounter from "components/InputNumber";
import "pages/create_test/number_only/NumberOnly.css";

import API from "api.js";

import { useNavigate } from "react-router-dom";

import {
    CREATE_RANDOM_TEST_URL,
    TEST_MENU_URL,
    TEST_PUBLISHED_URL,
} from "urls.js";
import history from "history.js";

function CreateRandomTest() {
    document.documentElement.style.setProperty("--base", "var(--pink)");

    const [num, setNum] = useState(1);
    const [isPage1, setIsPage1] = useState(true);
    const [text, setText] = useState("");

    const [quizzes, setQuizzes] = useState([]);
    const [quizzes_count, setQuizzesCount] = useState(-1);

    if (quizzes_count == -1) {
        getQuizzesCount();
    }


    if (history.location.state != null && quizzes.length == 0) {
        setNum(history.location.state.quizzes?.length);
        setText(history.location.state.name);
        setQuizzes(history.location.state?.quizzes);
    }

    let navigate = useNavigate();

    function genQuizzesWithoutTags() {
        API.genQuizzes(num).then((data) => {
            setQuizzes(data.quizzes);
        });
    }

    function getQuizzesCount() {
        API.getNumQuizzes().then((data) => {
            setQuizzesCount(data.quizzes_count);
        });
    }

    function handleCreateButtonChange() {
        if (num <= quizzes_count) {
            setIsPage1(false);
        }

        if (quizzes.length != num) {
            genQuizzesWithoutTags();
        }
    }

    function handleNameChange(e) {
        setText(e.target.value);
    }

    function handleNextButtonChange() {
        if (text.length != 0) {
            let quiz_ids = quizzes.map((quiz) => quiz.id);

            API.postTest(text, 1, quiz_ids); // TODO: get author -> logged in user

            history.push(CREATE_RANDOM_TEST_URL);

            navigate(TEST_PUBLISHED_URL, {
                state: {
                    name: text,
                    quizzes: quizzes,
                    previous_path: CREATE_RANDOM_TEST_URL,
                },
            });
        }
    }

    function handleGoBackChange() {
        setIsPage1(true);
    }

    function handleGoBackToMenu() {
        navigate(TEST_MENU_URL);
    }

    if (isPage1) {
        return (
            <div className="NumberOnly-firstPage">
                <h1 className="NumberOnly-title">Create a Test</h1>
                <h2 className="NumberOnly-subTitle">Random Test</h2>
                <div className="NumberOnly-formControl">
                    <IncDecCounter
                        num={num}
                        setNum={setNum}
                        label={
                            "Choose the number of quizzes you want in your test"
                        }
                    />
                </div>
                <h2 className="NumberOnly-errorQuizzesCounter">
                    {num > quizzes_count
                        ? "The number chosen is greater than the number of existing quizzes"
                        : ""}
                </h2>
                <div className="NumberOnly-Publish-GoBack-buttons">
                    <div className="NumberOnly-buttonCreate">
                        <button onClick={handleGoBackToMenu}>Go Back</button>
                    </div>
                    &nbsp;&nbsp;
                    <div className="NumberOnly-buttonCreate">
                        <button onClick={handleCreateButtonChange}>Next</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="NumberOnly-secondPage">
                <h1 className="NumberOnly-title">Create a Test</h1>
                <h2 className="NumberOnly-subTitle">Random Test</h2>

                <div className="NumberOnly-inputDiv">
                    <h1 className="NumberOnly-inputTitle">
                        {"Name your test"}
                    </h1>
                    <input
                        className="NumberOnly-inputText"
                        type="text"
                        name="name"
                        value={text}
                        onChange={handleNameChange}
                    />
                    <h2 className="NumberOnly-errorInput">
                        {text.length > 0 ? "" : "Name is mandatory"}
                    </h2>
                </div>

                <h3 className="NumberOnly-title"> Chosen Quizzes: </h3>
                <ul className="NumberOnly-quizList">
                    {quizzes.map((quiz) => (
                        <li className="NumberOnly-quiz">{quiz.name}</li>
                    ))}
                </ul>

                <div className="NumberOnly-Publish-GoBack-buttons">
                    <button
                        className="NumberOnly-GoBackbutton"
                        onClick={handleGoBackChange}
                    >
                        Go Back
                    </button>

                    <button
                        className="NumberOnly-NextButton"
                        onClick={handleNextButtonChange}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default CreateRandomTest;
