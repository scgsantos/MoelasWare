import React, { useState } from "react";
import IncDecCounter from "components/InputNumber";
import "pages/create_test/number_only/NumberOnly.css";

import { useNavigate } from "react-router-dom";

import API from "api.js";

import {
    CREATE_TEST_URL,
    TEST_MENU_URL,
    TEST_PUBLISHED_URL,
    CREATE_TEST_WITH_TAGS_URL,
} from "urls.js";
import history from "history.js";

function CreateRandomTestWithSpecs() {
    document.documentElement.style.setProperty("--base", "var(--pink)");

    const [num, setNum] = useState(1);
    const [isPage1, setIsPage1] = useState(true);
    const [text, setText] = useState("");

    var [search, setSearch] = useState("");
    const [all_tags, setAllTags] = useState([]);
    const [searched_tags, setSearchedTags] = useState([]);
    const [tags, setTags] = useState([]);

    const [quizzes, setQuizzes] = useState([]);
    const [quizzes_count, setQuizzesCount] = useState(-1);

    const [error, setError] = useState(false);

    if (quizzes_count == -1) {
        getQuizzesCount();
        getAllTags();
    }

    /*if (history.location.state != null && quizzes?.length == 0) {
    setNum(history.location.state?.quizzes?.length);
    setText(history.location.state?.name);
    setQuizzes(history.location.state?.quizzes);
    setTags(history.location.state?.tags);
    setPrevTags(history.location.state?.tags);

    setReload(true);
  }*/

    //console.log(quizzes);

    let navigate = useNavigate();

    async function genQuizzes() {
        const response = await API.makeRequest("quizzes/gen/", "POST", {
            num_quizzes: num,
            tags: tags,
        });

        if (!response.ok) {
            setError(true);
            setQuizzes([]);
            return null;
        }
        const result = await response.json();

        setError(false);
        setQuizzes(result.quizzes);
        return true;
    }

    function getQuizzesCount() {
        API.getNumQuizzes().then((data) => {
            setQuizzesCount(data.quizzes_count);
        });
    }

    function getAllTags() {
        API.getTags().then((data) => {
            setAllTags(data.tags);
            setSearchedTags(data.tags);
        });
    }

    async function handleSearchChange(e) {
        setSearch(e.target.value);

        if (e.target.value !== "") {
            var tags_matching_search = [];

            for (let i = 0; i < all_tags.length; i++) {
                if (
                    all_tags[i].text
                        .toUpperCase()
                        .indexOf(e.target.value.toUpperCase()) === 0
                ) {
                    tags_matching_search.push(all_tags[i]);
                }
            }

            setSearchedTags(tags_matching_search);
        } else {
            setSearchedTags(all_tags);
        }
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    async function handleCreateButtonChange() {
        if (num <= quizzes_count) {
            let result = await genQuizzes();

            if (result != null) setIsPage1(false);
        }
    }

    function handleNameChange(e) {
        setText(e.target.value);
    }

    function handleTagsChange(e) {
        setTags(e.target.value.split(" "));
    }

    function handleNextButtonChange() {
        if (text.length != 0 && quizzes.length > 0) {
            history.push(CREATE_TEST_WITH_TAGS_URL);
            let quiz_ids = quizzes.map((quiz) => quiz.id);

            API.postTest(text, 1, quiz_ids); // TODO: get author -> logged in user

            navigate(TEST_PUBLISHED_URL, {
                state: {
                    tags: tags,
                    name: text,
                    quizzes: quizzes,
                    previous_path: CREATE_TEST_WITH_TAGS_URL,
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

    function handleTagSelectionChange(tag) {
        if (tagHasBeenSelected(tag)) {
            var t = tags.filter(function (t) {
                return t !== tag.text;
            });
            setTags(t); // if quiz already in list, remove it
        } else {
            setTags(tags.concat(tag.text)); // if not, add
        }
    }

    function tagHasBeenSelected(tag) {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] == tag.text) {
                return true;
            }
        }
        return false;
    }

    function renderTag(tag) {
        if (tagHasBeenSelected(tag)) {
            return (
                <li
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTagSelectionChange(tag)}
                >
                    <p style={{ color: "green" }}>{tag.text}</p>
                </li>
            );
        } else {
            return (
                <li
                    type="checkbox"
                    style={{
                        cursor: "pointer",
                        backgroundColor: "blue !important",
                    }}
                    onClick={() => handleTagSelectionChange(tag)}
                >
                    <p style={{ color: "black" }}>{tag.text}</p>
                </li>
            );
        }
    }

    function getTagDistribution(tag) {
        let n_occurences = 0;
        for (let i = 0; i < quizzes.length; i++) {
            for (let j = 0; j < quizzes[i].tags.length; j++) {
                if (quizzes[i].tags[j].text == tag) n_occurences++;
            }
        }
        return n_occurences;
    }

    if (isPage1) {
        return (
            <div className="NumberOnly-firstPage">
                <h1 className="NumberOnly-title">Create a Test</h1>
                <h2 className="NumberOnly-subTitle">
                    Random Test with Specifications
                </h2>

                <div className="NumberOnly-formControl">
                    <IncDecCounter
                        num={num}
                        setNum={setNum}
                        label={
                            "Choose the number o quizzes you want in your test"
                        }
                    />
                </div>
                <h2 className="NumberOnly-errorQuizzesCounter">
                    {num > quizzes_count
                        ? "The number chosen is greater than the number of existing quizzes"
                        : ""}
                </h2>

                <div className="SelectQuizzes-listTest">
                    <h1 className="NumberOnly-inputTitle">
                        {"Specify the tags you must have in the quizzes"}
                    </h1>
                    <input
                        placeholder="search the #tag you want here"
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <div className="NumberOnly-inputDiv">
                        <h2 className="NumberOnly-errorInput">
                            {!error
                                ? ""
                                : "Not enough quizzes with the given specifications."}
                        </h2>
                        <ul>{searched_tags.map((tag) => renderTag(tag))}</ul>
                    </div>
                </div>
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
                <h2 className="NumberOnly-subTitle">
                    Random Test with Specifications
                </h2>

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
                        {text?.length > 0 ? "" : "Name is mandatory"}
                    </h2>

                    <h3 className="NumberOnly-title"> Chosen Quizzes: </h3>

                    <ul style={{ width: "20em" }}>
                        {tags.map((tag) => (
                            <li className="NumberOnly-quiz">
                                {tag} x{getTagDistribution(tag)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="NumberOnly-Publish-GoBack-buttons">
                    <button
                        className="NumberOnly-GoBackbutton"
                        onClick={handleGoBackChange}
                    >
                        Go Back
                    </button>
                    &nbsp;
                    <button
                        className="NumberOnly-CreateButton"
                        onClick={handleNextButtonChange}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

export default CreateRandomTestWithSpecs;
