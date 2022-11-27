import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import API from "api.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
    const [tags, setTags] = useState([]);
    const [frequency, setFrequency] = useState([]);
    const [user, setUser] = useState("Nothing");
    const [number_of_correct_answers, setNumberCorrectAnswers] = useState(0);
    const quizHeader = ["TAG", "CORRECT ANSWERS"];
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
                setNumberCorrectAnswers(data.correct_answers);
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
            <div id="profile" style={{ width: "50%", margin: "0 auto" }}>
                <h1>{user.toLocaleUpperCase()}'S PROFILE</h1>
                <Pie
                    width={128}
                    height={128}
                    data={{
                        labels: tags,
                        datasets: [
                            {
                                label: "Number of correct answers",
                                data: frequency,
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                    "rgba(255, 159, 64, 0.2)",
                                    "rgba(75, 0, 130, 0.2)",
                                    "rgba(0, 0, 255, 0.2)",
                                    "rgba(0, 255, 0, 0.2)",
                                    "rgba(255, 127, 0, 0.2)",
                                    "rgba(255, 255, 0, 0.2)",
                                    "rgba(148, 0, 211, 0.2)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(255, 206, 86, 1)",
                                    "rgba(75, 192, 192, 1)",
                                    "rgba(153, 102, 255, 1)",
                                    "rgba(255, 159, 64, 1)",
                                    "rgba(75, 0, 130, 1)",
                                    "rgba(0, 0, 255, 1)",
                                    "rgba(0, 255, 0, 1)",
                                    "rgba(255, 127, 0, 1)",
                                    "rgba(255, 255, 0, 1)",
                                    "rgba(148, 0, 211, 1)",
                                ],
                                hoverOffset: 20,
                                borderWidth: 3,
                                offset: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            },
                        ],
                    }}
                ></Pie>
            </div>
        );
    }
}
