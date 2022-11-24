import React from "react";
import API from "api.js";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Drafts.css";

function Drafts() {
    document.documentElement.style.setProperty("--base", "var(--blue)");
    const [drafts, setDrafts] = useState([]);

    const draftsHeader = ["QUIZ NAME", "LAST EDITED"];
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`../createquiz/edit/${e}`);
    };

    useEffect(() => {
        API.getUnfinishedQuizzes().then((data) => {
            console.log(data.quizzes);
            setDrafts(data.quizzes);
        });
    }, []);

    return (
        <React.Fragment>
            <main className="container" id="drafts">
                <h1 className="title">CREATE A QUIZ</h1>
                <h2>DRAFTS</h2>
                <section id="mydrafts">
                    <table>
                        <thead>
                            <tr>
                                {draftsHeader.map((h) => (
                                    <th key={h}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {drafts.map((t) => (
                                <tr
                                    key={drafts[0][1]}
                                    onClick={(e) => handleClick(drafts[0][1])}
                                >
                                    <td>{drafts[0][0]}</td>
                                    <td>{drafts[0][2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </React.Fragment>
    );
}

export default Drafts;
