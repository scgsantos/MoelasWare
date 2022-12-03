import React from "react";
import API from "api.js";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Drafts.css";

function Drafts() {
    document.documentElement.style.setProperty("--base", "var(--blue)");
    const [drafts, setDrafts] = useState([]);
    const [error, setError] = useState(false);
    const draftsHeader = ["QUIZ NAME", "LAST EDITED"];
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`../createquiz/edit/${e}`);
    };

    useEffect(() => {
        API.getDrafts().then((data) => {
            setError(data.error);
            if (!error){
                setDrafts(data.quizzes);
            }
        });
    }, []);

    if (error){
        return (
            <React.Fragment>
                <main className="container" id="drafts">
                    <h1 className="title">CREATE A QUIZ</h1>
                    <h2>DRAFTS</h2>
                    <h3>No drafts found</h3>
                    </main>
            </React.Fragment>
        );
    } else {

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
                                {drafts.map((d) => (
                                    <tr
                                        key={d[1]}
                                        onClick={(e) => handleClick(d[1])}
                                    >
                                        <td>{d[0]}</td>
                                        <td>{d[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </React.Fragment>
        );
    }
}
export default Drafts;
