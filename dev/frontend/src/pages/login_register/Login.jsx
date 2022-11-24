import "pages/login_register/Login.css";
import React, { useEffect, useState } from "react";
import API from 'api.js';
import { useNavigate } from "react-router";
import isLoggedIn from "utils";


function Login() {
    document.documentElement.style.setProperty("--base", "var(--beige)");

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        repeat_password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {   
      if (isLoggedIn()){
        navigate("/");
      }
      }, []);

    if (isLoggedIn()){
      navigate("/");
    }

    function handleChange(event) {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        API.login(inputs.username, inputs.password)
        .then(() => {
          navigate("/");
          window.location.reload();
        });
    };

    const handleRegister = (event) => {
        event.preventDefault();
        API.register(inputs.username, inputs.password, inputs.repeat_password)
        .then(() => {
            API.login(inputs.username, inputs.password)
            .then(() => {
              navigate("/");
              window.location.reload();
            });
        });
        
    };

    return (
        <main className="container" id="auth">
            <div className="login">
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
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
                        type="text"
                        placeholder="username"
                        name="username"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        size="30"
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        placeholder="repeat password"
                        name="repeat_password"
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
