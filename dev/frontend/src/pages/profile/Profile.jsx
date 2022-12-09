import React, { useState, useEffect } from "react";
import API from "api.js";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import "pages/profile/Profile.css";

ChartJS.register(ArcElement, Tooltip);

function Profile() {
    document.documentElement.style.setProperty("--base", "var(--beige)");

    const tagsLegend = [
        { short: "PM", long: "Project management" },
        { short: "REQ", long: "Requirements" },
        { short: "A&D", long: "Arquitecture and design" },
        { short: "IMP", long: "Implementation" },
        { short: "TST", long: "Testing and product quality control" },
        { short: "V&V", long: "Verification and validation" },
        { short: "DEP", long: "Deployment" },
        { short: "CI", long: "Continuous practices" },
        { short: "PRC", long: "Good practices and process control" },
        { short: "PPL", long: "Peopleware" },
        { short: "CCM", long: "Configuration and change management" },
        { short: "RSK", long: "Risk management" },
    ];

    const [tags, setTags] = useState([]);
    const [frequency, setFrequency] = useState([]);
    const [user, setUser] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const getTag = [];
    const getFreq = [];

    useEffect(() => {
        API.getProfile().then((data) => {
            if (data.error) {
                setError(data.error);
                setErrorMessage(data.message);
                setUser(data.user);
            } else {
                setUser(data.user);
                console.log(data.profile);
                Object.entries(data.profile).forEach(([key, value]) => {
                    if (value != 0){
                    getTag.push(key);
                    getFreq.push(value);   
                    }
                });
                setTags(getTag);
                setFrequency(getFreq);
            }
        });
    }, []);

    if (error) {
        return (
            <section id="profile">
                <h1>{user.toLocaleUpperCase()}'S PROFILE</h1>
                <h2>{errorMessage}</h2>
            </section>
        );
    } else {
        return (
            <main className="container" id="profile">
                <h1 className="title">{user.toLocaleUpperCase()}'S PROFILE</h1>

                <div className="score">
                    <h2>SCORE</h2>
                    <div className="legend">
                        <div>
                            {tagsLegend.map((t) => (
                                <b>
                                    <p key={t.short}>{t.short}</p>
                                </b>
                            ))}
                        </div>
                        <div>
                            {tagsLegend.map((t) => (
                                <p key={t.long}>{t.long}</p>
                            ))}
                        </div>
                    </div>
                    <div className="chart">
                        <Pie
                            width={128}
                            height={128}
                            options={{
                                animation: false,
                            }}
                            data={{
                                labels: tags,
                                datasets: [
                                    {
                                        label: "Correct quizzes",
                                        data: frequency,
                                        backgroundColor: [
                                            "rgba(255, 255, 255, 0)",
                                        ],
                                        borderColor: "rgba(0, 0, 0, 1)",
                                        hoverBackgroundColor:
                                            "rgba(0, 0, 0, 1)",
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        ></Pie>
                    </div>
                </div>
            </main>
        );
    }
}

export default Profile;
