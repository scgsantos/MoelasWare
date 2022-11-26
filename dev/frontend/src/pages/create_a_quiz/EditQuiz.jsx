import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import API from "api.js";

function EditQuiz() {
    document.documentElement.style.setProperty("--base", "var(--blue)");

    const { id } = useParams();

    var [inputs, setInputs] = useState([]);

    useEffect(() => {
        API.getDraftById(id).then((data) => {
            console.log(data.draft);
            setInputs((inputs) => [
                ...inputs,
                {
                    name: data.draft[0].name,
                    tag: data.draft[0].tags[0].text,
                    question: data.draft[0].question,
                    description: data.draft[0].description,
                },
                {
                    option: data.draft[1].text,
                    justification: data.draft[1].justification,
                    correct: data.draft[1].correct,
                },
                {
                    option: data.draft[2].text,
                    justification: data.draft[2].justification,
                    correct: data.draft[2].correct,
                },
                {
                    option: data.draft[3].text,
                    justification: data.draft[3].justification,
                    correct: data.draft[3].correct,
                },
                {
                    option: data.draft[4].text,
                    justification: data.draft[4].justification,
                    correct: data.draft[4].correct,
                },
                {
                    option: data.draft[5].text,
                    justification: data.draft[5].justification,
                    correct: data.draft[5].correct,
                },
                {
                    option: data.draft[6].text,
                    justification: data.draft[6].justification,
                    correct: data.draft[6].correct,
                },
            ]);
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

    function handleChange(event) {
        const newState = inputs.map((obj) => {
            return (
                { [event.target.name]: event.target.value },
                { id: 1 },
                { id: 2 },
                { id: 2 },
                { id: 2 },
                { id: 2 },
                { id: 2 }
            );
        });

        setInputs(newState);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        //API.createQuiz(inputs).then((data) => setResposta(data.resposta));
        //navigate(-1);
        //window.location.reload();
    };

    let options = [];
    for (let i = 1; i < 7; i++) {
        options.push(
            <React.Fragment>
                <div className="option">
                    <input
                        type="radio"
                        name="correct"
                        checked={inputs[i]?.correct}
                        onChange={handleChange}
                    />

                    <label key={"o" + i}>
                        <p>OPTION #{i}</p>
                        <input
                            name={"option" + i}
                            value={inputs[i]?.option}
                            type="text"
                            placeholder={"Insert answer #" + i}
                            size="40"
                            onChange={handleChange}
                        />
                    </label>

                    <label key={"j" + i}>
                        <p>JUSTIFICATION</p>
                        <input
                            name={"justification" + i}
                            value={inputs[i]?.justification}
                            type="text"
                            placeholder={
                                "Insert answer #" + i + " justification"
                            }
                            size="60"
                            onChange={handleChange}
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
                                    value={inputs[0]?.name}
                                    type="text"
                                    placeholder="Insert a name for the quiz"
                                    size="40"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="tag-container">
                            <label>
                                <p>TAG</p>
                                <select
                                    name="tag"
                                    value={inputs[0]?.tag}
                                    onChange={handleChange}
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
                                    value={inputs[0]?.question}
                                    placeholder="Insert question"
                                    size="50"
                                    onChange={handleChange}
                                />
                            </label>

                            <div className="description-container">
                                <label>
                                    <p>DESCRIPTION</p>
                                    <input
                                        name="description"
                                        type="text"
                                        value={inputs[0]?.description}
                                        placeholder="Insert question description"
                                        size="70"
                                        onChange={handleChange}
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
