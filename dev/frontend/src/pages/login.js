import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import '../common.css'

import logo from '../logo.svg';

//TODO 
//[] - routing to another page after successful login
//[] - show error/bad request messages after submiting 

class Login extends React.Component{ 

  constructor(props){
    super(props);
    this.state = {
      //Login
      emailLogin: "", 
      passwordLogin: "",
      //Register  
      usernameRegister: "",
      emailRegister: "",
      passwordRegister: "",
      passwordRepeatRegister: ""
    };

    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);

    this.handleEmailRegister = this.handleEmailRegister.bind(this);
    this.handleUsernameRegister = this.handleUsernameRegister.bind(this);
    this.handlePasswordRegister = this.handlePasswordRegister.bind(this);
    this.handlePasswordRepeatRegister = this.handlePasswordRepeatRegister.bind(this);
  }

  handleEmailLogin(e){
    let email = e.target.value;

    this.setState({
        "emailLogin": email
    })
   
  }

  handlePasswordLogin(e){
    let password = e.target.value;
    this.setState({
        "passwordLogin": password
    })
    
  }

  handleUsernameRegister(e){
    let username = e.target.value;
    
    this.setState({
        "usernameRegister": username
    })
   
  }

  handleEmailRegister(e){
    let email = e.target.value;
    
    this.setState({
        "emailRegister": email
    })
    
  }

  handlePasswordRegister(e){
    let password = e.target.value;
    this.setState({
        "passwordRegister": password
    })
    
  }


  handlePasswordRepeatRegister(e){
    let password = e.target.value;
    this.setState({
        "passwordRepeatRegister": password
    })
    
  }


  Login(){
    
    console.log("Logging in")
    
    fetch('http://localhost:8000/api/login/',{
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
      body: JSON.stringify({
        
        email : this.state.emailLogin,
        password : this.state.passwordLogin})
      
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      
      let info = data;
      console.log(info.ID)
      if(info.Response === 'Successfully logged user in')
        console.log("routing here?")
    })
  
  }
  
  Register(){

    console.log("Registering")
    
    fetch('http://localhost:8000/api/register/',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        username : this.state.usernameRegister,
        email : this.state.emailRegister,
        password1 : this.state.passwordRegister,
        password2 : this.state.passwordRepeatRegister

      })
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    })

    
  }

  render(){
    return(
      <div>
         <div className="start">
          <div className="click">
            <img src={logo} alt="Logo Moelas Ware" />
          </div>
          <div className="click">
            <h1>Login/Register</h1>
          </div>
        </div>
        <div>
          

          <div className="loc">
          
              <div className="login">
                <h2>LOGIN</h2>
                  
                  <input name="email" type="email" placeholder='Email' onChange={this.handleEmailLogin}/>
                  <input name="password" type="password" placeholder='Password' onChange={this.handlePasswordLogin}></input>
                  
                  <button type="submit" onClick={() => this.Login() }>ENTER</button>
                
              </div>
              <div className="register">
                <h2>REGISTER</h2>
                
                <input name="username" type="username" placeholder='Username' onChange={this.handleUsernameRegister}></input>
                <input name="email" type="email" placeholder='Email' onChange={this.handleEmailRegister}></input>
                <input name="password" type="password" placeholder='Password' onChange={this.handlePasswordRegister}></input>
                <input type="password" placeholder='Repeat Password' onChange={this.handlePasswordRepeatRegister}></input>

                <button type="submit" onClick={() => this.Register()}>ENTER</button>
              </div>
              
          </div> 
        </div>
      </div>
    );
  }


}

export default Login;