import React, { useState, useEffect } from "react";
import API from "api.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
    document.documentElement.style.setProperty("--base", "var(--beige)");
    const [tags, setTags] = useState([]);
    const [frequency, setFrequency] = useState([]);
    const [user, setUser] = useState("Nothing");
    //const quizHeader = ["TAG", "CORRECT ANSWERS"];
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        API.getProfile().then((data) => {
            if (data.error) {
                setError(data.error);
                setErrorMessage(data.message);
                setUser(data.user);
            } else {
                const getTag = [];
                const getFreq = [];
                setUser(data.user);
                Object.entries(data.profile).forEach(([key, value]) => {
                    getTag.push(key);
                    getFreq.push(value);
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
            <div id="profile" style={{ width: "25%", margin: "0 auto" }}>
                <h1>{user.toLocaleUpperCase()}'S PROFILE</h1>
                <Pie
                    width={128}
                    height={128}
                    data={{
                        labels: tags,
                        datasets: [
                            {
                                label: "Correct quizzes",
                                data: frequency,
                                backgroundColor: [
                                    "rgba(255, 255, 255, 0)",
                                ],
                                borderColor: [
                                    "rgba(0, 0, 0, 1)",
                                ],
                                hoverBackgroundColor: "rgba(0, 0, 0, 1)",
                                hoverOffset: 0,
                                borderWidth: 1,
                            },
                        ],
                    }}
                ></Pie>
            </div>
        );
    }
}
