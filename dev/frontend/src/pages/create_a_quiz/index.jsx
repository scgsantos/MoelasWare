import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import API from 'api.js';
import Button from "components/CreateQuizButton.jsx";
import "pages/create_a_quiz/CreateQuiz.css";
import Button2 from "components/Button.jsx";

const CreateQuiz = () => {
    document.documentElement.style.setProperty("--base", "var(--blue)");

    const quizzesHeader = ["QUIZ NAME", "TAG", "REVIEWS", "STATE"];
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        API.getMyFinishedQuizzes()
            .then((data) => {
                setQuizzes(data.list_of_quizzes)
            });
    }, []);

    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`./myquiz/${e}`);
    };

    return (
        <React.Fragment>

            <input type='file'></input>

            <main className="container" id="createquiz">
                <h1 className="title">CREATE A QUIZ</h1>

                <Button2 name="IMPORT" disabled={false} type="file" onClick={() => {
                    var input = document.querySelector('input[type="file"]');
                    API.uploadXML(input.files[0]).then((response) => {
                        console.log(response)
                    })
                }} />

                <Button to="./new" className="createquiznav" text="NEW QUIZ" />
                <Button
                    to="./drafts"
                    className="createquiznav"
                    text="DRAFTS"
                />
                <section id="myquizzes">
                    <h2>MY QUIZZES</h2>
                    <table>
                        <thead>
                            <tr>
                                {quizzesHeader.map((h) => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((t) => (
                                <tr
                                    key={Object.values(t)[0]}
                                    onClick={(e) =>
                                        handleClick(Object.values(t)[0])
                                    }
                                >
                                    <td>{Object.values(t)[1]}</td>
                                    <td>{Object.values(t)[2][0].text}</td>
                                    <td>{Object.values(t)[3]}/3</td>
                                    <td>{Object.values(t)[4]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default CreateQuiz;
