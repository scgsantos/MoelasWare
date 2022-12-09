import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import API from "api.js";
import Button from "components/CreateQuizButton.jsx";
import "pages/create_a_quiz/CreateQuiz.css";
import { QUIZ_INFO_URL, DRAFTS_URL, CREATE_QUIZ_URL } from "urls";


const CreateQuiz = () => {
    document.documentElement.style.setProperty("--base", "var(--blue)");

    const quizzesHeader = ["QUIZ NAME", "TAG", "REVIEWS", "STATE"];
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getMyFinishedQuizzes().then((data) => {
            setError(data.error);
            if (!error){
                setQuizzes(data.list_of_quizzes);
            }
        });
    }, []);

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(QUIZ_INFO_URL + e);
    };
    return (
        <React.Fragment>
            <main className="container" id="createquiz">
                <h1 className="title">CREATE A QUIZ</h1>

                <Button to={CREATE_QUIZ_URL} className="createquiznav" text="NEW QUIZ" />

                <Button
                    to={DRAFTS_URL}
                    className="createquiznav"
                    text="DRAFTS"
                />

                <br/><br/>

                <div className="cq-inline">
                    <p>Import quiz: </p>
                    <input className='createquiznav' type='file'></input>
                    <button disabled={false} type="file" onClick={() => {
                        var input = document.querySelector('input[type="file"]');
                        API.uploadXML(input.files[0]).then((response) => {
                            console.log(response)
                        })
                    }}>IMPORT</button>
                </div>

                <section id="myquizzes">
                    {(() => {
                    var array = [];
                    if (error){
                        array.push(
                            <div>
                            <h2>MY QUIZZES</h2>
                            <h3>No finished quizzes found</h3>
                            </div>)
                            
                    } else {
                        array.push(
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
                        )
                    }
                    return array;
                    })()}
                </section>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default CreateQuiz;
