import 'pages/login_register/login.css';

function Login() {
  return (
    <div>
      <div className="loc">
        <div className="login">
          <h2>
            LOGIN
          </h2>
          <input id="username_log" type="email" placeholder='username'></input>
          <input id="password_log" type="password" placeholder='password'></input>
          <button className="btn btn_click" type="submit" onclick="#login">ENTER</button>
        </div>
        <div className="register">
          <h2>
            REGISTER
          </h2>
          <input id="username_reg" type="email" placeholder='username'></input>
          <input id="password_reg" type="password" placeholder='password'></input>
          <input id="repeat_password" type="password" placeholder='repeat password'></input>
          <button className="btn btn_click" type="submit" onclick="#register">ENTER</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
