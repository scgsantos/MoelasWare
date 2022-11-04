import React, { Component } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from 'react-router-dom';

import App_Routes from './Routes.js';


import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import "./common.css";
import App from "./App";


/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);*/

ReactDOM.render(
  <Router>
    <div className="App"> Hello
      <App_Routes/>
    </div>
  </Router>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
