import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./common.css";
import App from "./App";
import App from "./App.js";


import "index.css";
import CreateRandomTest from "pages/create_test/number_only/req_2_1.js";
import Preview from "pages/create_test/preview/preview.js";
import CreateTestMenu from "pages/create_test/menu/CreateTestMenu.js";
import CreateRandomTestWithSpecs from "pages/create_test/number_and_tags/req_2_2.js";
import CreateTest from "pages/create_test/select_quizzes/req_2_3.js";

import reportWebVitals from "./reportWebVitals";

import { CREATE_RANDOM_TEST_URL, CREATE_TEST_URL, MENU_URL, PREVIEW_URL, CREATE_TEST_WITH_TAGS_URL } from "urls.js";
import history from './history.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history}>
    <Routes>
      <Route exact path={MENU_URL} element={<CreateTestMenu />} />
      <Route exact path={CREATE_RANDOM_TEST_URL} element={<CreateRandomTest />} />
      <Route exact path={CREATE_TEST_URL} element={<CreateTest />} />
      <Route exact path={PREVIEW_URL} element={<Preview />} />
      <Route exact path={CREATE_TEST_WITH_TAGS_URL} element={<CreateRandomTestWithSpecs />} />
    </Routes>
  </Router>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
