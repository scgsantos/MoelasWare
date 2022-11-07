import './login.css';
import logo from '../logo.svg';

function Login() {
  return (
    <div>
      <div className="start">
        <div className="click">
          <img src={logo} alt="Logo Moelas Ware" />
        </div>
        <div className="click">
          <h1>Login/Register</h1>
        </div>
      </div>
      <div className="loc">
        <div className="login">
          <h2>
            LOGIN
          </h2>
          <input id="username_log" type="email" placeholder='username'></input>
          <input id="password_log" type="password" placeholder='password'></input>
          <button type="submit" onclick="#login">ENTER</button>
        </div>
        <div className="register">
          <h2>
            REGISTER
          </h2>
          <input id="username_reg" type="email" placeholder='username'></input>
          <input id="password_reg" type="password" placeholder='password'></input>
          <input id="repeat_password" type="password" placeholder='repeat password'></input>
          <button type="submit" onclick="#register">ENTER</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
