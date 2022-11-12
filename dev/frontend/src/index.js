import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import './index.css';
import Login from './pages/login.js';
import { LOGIN_URL } from './urls.js';

import reportWebVitals from './reportWebVitals';
//import Quiz from './pages/create_quizz/createQuiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history}>
    <Routes>
      <Route exact path={LOGIN_URL} element={<Login />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
