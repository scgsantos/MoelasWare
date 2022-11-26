import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import API from "api.js";

function EditQuiz() {
    document.documentElement.style.setProperty("--base", "var(--blue)");

    const { id } = useParams();

    var [inputs, setInputs] = useState({});

    useEffect(() => {
        API.getDraftById(id).then((data) => {
            console.log(data.draft);
            setInputs({
                ...inputs,
                info: {
                    name: data.draft[0].name,
                    tag: data.draft[0].tags[0]?.text,
                    question: data.draft[0].question,
                    description: data.draft[0].description,
                    correct: `${data.draft[0].correct}`,
                },
                answer1: {
                    option: data.draft[1].text,
                    justification: data.draft[1].justification,
                },
                answer2: {
                    option: data.draft[2].text,
                    justification: data.draft[2].justification,
                },
                answer3: {
                    option: data.draft[3].text,
                    justification: data.draft[3].justification,
                },
                answer4: {
                    option: data.draft[4].text,
                    justification: data.draft[4].justification,
                },
                answer5: {
                    option: data.draft[5].text,
                    justification: data.draft[5].justification,
                },
                answer6: {
                    option: data.draft[6].text,
                    justification: data.draft[6].justification,
                },
            });
        });
    }, []);
    console.log(inputs);

    const tags = [
        { index: 0, label: "-", value: "null" },
        { index: 1, label: "PM", value: "PM" },
        { index: 2, label: "REQ", value: "REQ" },
        { index: 3, label: "A&D", value: "A&D" },
        { index: 4, label: "IMP", value: "IMP" },
        { index: 5, label: "TST", value: "TST" },
        { index: 6, label: "V&V", value: "V&V" },
        { index: 7, label: "DEP", value: "DEP" },
        { index: 8, label: "CI", value: "CI" },
        { index: 9, label: "PRC", value: "PRC" },
        { index: 10, label: "PPL", value: "PPL" },
        { index: 11, label: "CCM", value: "CCM" },
        { index: 12, label: "RSK", value: "RSK" },
    ];

    const navigate = useNavigate();

    function handleInfoChange(event) {
        setInputs({
            ...inputs,
            info: {
                ...inputs.info,
                [event.target.name]: event.target.value,
            },
        });
    }

    function handleAnswerChange(event) {
        setInputs({
            ...inputs,
            [event.target.className]: {
                ...inputs[event.target.className],
                [event.target.name]: event.target.value,
            },
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        API.createQuiz(inputs);
        navigate(-1);
        //window.location.reload();
    };

    let options = [];
    for (let i = 1; i < 7; i++) {
        var answeri = "answer" + i;
        options.push(
            <React.Fragment>
                <div className="option">
                    <input
                        value={i}
                        type="radio"
                        name="correct"
                        className={"answer" + i}
                        checked={inputs?.info?.correct == i}
                        onChange={handleInfoChange}
                    />

                    <label key={"o" + i}>
                        <p>OPTION #{i}</p>
                        <input
                            name="option"
                            className={"answer" + i}
                            value={inputs[answeri]?.option}
                            type="text"
                            placeholder={"Insert answer #" + i}
                            size="40"
                            onChange={handleAnswerChange}
                        />
                    </label>

                    <label key={"j" + i}>
                        <p>JUSTIFICATION</p>
                        <input
                            name="justification"
                            className={"answer" + i}
                            value={inputs[answeri]?.justification}
                            type="text"
                            placeholder={
                                "Insert answer #" + i + " justification"
                            }
                            size="60"
                            onChange={handleAnswerChange}
                        />
                    </label>
                </div>
                <div className="break"></div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <main className="container" id="newquiz">
                <h1 className="title">CREATE A QUIZ</h1>
                <h2>EDIT QUIZ</h2>
                <form onSubmit={handleSubmit}>
                    <div className="newquiz">
                        <div className="name-container">
                            <label>
                                <p>QUIZ NAME</p>

                                <input
                                    name="name"
                                    value={inputs?.info?.name}
                                    type="text"
                                    placeholder="Insert a name for the quiz"
                                    size="40"
                                    onChange={handleInfoChange}
                                />
                            </label>
                        </div>
                        <div className="tag-container">
                            <label>
                                <p>TAG</p>
                                <select
                                    name="tag"
                                    value={inputs?.info?.tag}
                                    onChange={handleInfoChange}
                                >
                                    {tags.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="break"></div>
                        <div className="question-container">
                            <h3>QUESTION #1</h3>

                            <label>
                                <input
                                    name="question"
                                    type="text"
                                    value={inputs?.info?.question}
                                    placeholder="Insert question"
                                    size="50"
                                    onChange={handleInfoChange}
                                />
                            </label>

                            <div className="description-container">
                                <label>
                                    <p>DESCRIPTION</p>
                                    <input
                                        name="description"
                                        type="text"
                                        value={inputs?.info?.description}
                                        placeholder="Insert question description"
                                        size="70"
                                        onChange={handleInfoChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="break"></div>

                        <div className="options-container">{options}</div>
                        <div className="break"></div>
                        <input type="submit" value="SAVE AS DRAFT" />
                        <input type="submit" value="SUBMIT" />
                    </div>
                </form>
            </main>
        </React.Fragment>
    );
}

export default EditQuiz;
