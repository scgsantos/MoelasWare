import "pages/login_register/Login.css";
import React, { useState } from "react";

function Login() {
    document.documentElement.style.setProperty("--base", "var(--beige)");

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        repeat_password: "",
    });

    function handleChange(event) {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        fetch("", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs }),
        }).then((response) => response.json());
    };

    const handleRegister = (event) => {
        event.preventDefault();
        fetch("", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs }),
        }).then((response) => response.json());
    };

    return (
        <main className="container" id="auth">
            <div className="login">
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="username"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input type="submit" value="ENTER"></input>
                </form>
            </div>
            <div className="register">
                <h1>REGISTER</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="username"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="repeat password"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input type="submit" value="ENTER"></input>
                </form>
            </div>
        </main>
    );
}

export default Login;
