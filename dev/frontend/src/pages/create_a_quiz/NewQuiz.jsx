import React, { useState } from "react";
import { useNavigate } from "react-router";
import API from "api.js";

function NewQuiz() {
    document.documentElement.style.setProperty("--base", "var(--blue)");
    const [resposta, setResposta] = useState([]);
    const [buttonClick, setButtonClick] = useState("");

    const tags = [
        { label: "-", value: "null" },
        { label: "PM", value: "PM" },
        { label: "REQ", value: "REQ" },
        { label: "A&D", value: "A&D" },
        { label: "IMP", value: "IMP" },
        { label: "TST", value: "TST" },
        { label: "V&V", value: "V&V" },
        { label: "DEP", value: "DEP" },
        { label: "CI", value: "CI" },
        { label: "PRC", value: "PRC" },
        { label: "PPL", value: "PPL" },
        { label: "CCM", value: "CCM" },
        { label: "RSK", value: "RSK" },
    ];

    const [inputs, setInputs] = useState({
        name: "",
        tag: "",
        question: "",
        description: "",
        correct: "",
    });

    const navigate = useNavigate();

    function handleChange(event) {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (buttonClick === "submit") {
            API.createQuiz(inputs, true).then((data) => {
                setResposta(data.resposta);
                alert(data.resposta);
            }
            );
            navigate("../createquiz");
            window.location.reload();
        } else if (buttonClick === "draft") {
            API.createQuiz(inputs, false).then((data) => {
                setResposta(data.resposta);
                alert(data.resposta);
            }
            );
            navigate("../createquiz/drafts");
            window.location.reload();
        }
        

    };

    let options = [];
    for (let i = 1; i < 7; i++) {
        options.push(
            <React.Fragment>
                <div className="option">
                    <input
                        type="radio"
                        name="correct"
                        value={"option" + i}
                        checked={inputs.correct === "option" + i}
                        onChange={handleChange}
                    />

                    <label key={"o" + i}>
                        <p>OPTION #{i}</p>
                        <input
                            name={"option" + i}
                            type="text"
                            value={inputs.options}
                            placeholder={"Insert answer #" + i}
                            size="40"
                            onChange={handleChange}
                        />
                    </label>

                    <label key={"j" + i}>
                        <p>JUSTIFICATION</p>
                        <input
                            name={"justification" + i}
                            type="text"
                            value={inputs.justifications}
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
                <h2>NEW QUIZ</h2>
                <form autocomplete="off" onSubmit={handleSubmit}>
                    <div className="newquiz">
                        <div className="name-container">
                            <label>
                                <p>QUIZ NAME</p>

                                <input
                                    name="name"
                                    type="text"
                                    value={inputs.name}
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
                                    value={inputs.tag}
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
                                    value={inputs.question}
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
                                        value={inputs.description}
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
                        <input
                            type="submit"
                            value="SAVE AS DRAFT"
                            onClick={() => {
                                setButtonClick("draft");
                            }}
                        />
                        <input
                            type="submit"
                            value="SUBMIT"
                            onClick={() => {
                                setButtonClick("submit");
                            }}
                        />
                    </div>
                </form>
            </main>
        </React.Fragment>
    );
}

export default NewQuiz;
