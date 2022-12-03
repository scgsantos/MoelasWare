import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import API from "api.js";
import Button from "components/CreateQuizButton.jsx";
import "pages/create_a_quiz/CreateQuiz.css";

const CreateQuiz = () => {
    document.documentElement.style.setProperty("--base", "var(--blue)");

    const quizzesHeader = ["QUIZ NAME", "TAG", "REVIEWS", "STATE"];
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        API.getMyFinishedQuizzes().then((data) => {
            setError(data.error);
            if (error){
                setMessage(data.message);
            } else {
                setQuizzes(data.list_of_quizzes);
                console.log(quizzes)
            }
        });
    }, []);

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`./myquiz/${e}`);
    };
    if (error){
        return (
            <main className="container" id="createquiz">
                <h1 className="title">CREATE A QUIZ</h1>
                <Button to="./new" className="createquiznav" text="NEW QUIZ" />
                <Button to="./drafts" className="createquiznav" text="DRAFTS" />
                <section id="myquizzes">
                    <h2>MY QUIZZES</h2>
                    <h3>{message}</h3>
                </section>
            </main>
    );
    } else {
        return (
            <React.Fragment>
            <main className="container" id="createquiz">
                <h1 className="title">CREATE A QUIZ</h1>
                <Button to="./new" className="createquiznav" text="NEW QUIZ" />
                <Button to="./drafts" className="createquiznav" text="DRAFTS" />
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
    }
};

export default CreateQuiz;
