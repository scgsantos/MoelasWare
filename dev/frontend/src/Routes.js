
import React, { Component } from "react";
import { Router, Routes, Route } from "react-router-dom";

import App from "./App.js";
import CreateRandomTest from "./pages/req_2_1.js";
import PreviewTest from "./pages/preview.js";


import history from './history.js';

export default class App_Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Routes>
                    <Route path="/" exact component={CreateRandomTest} />
                    <Route path="/RandomTest" component={CreateRandomTest} />
                    <Route path="/TestPreview" component={PreviewTest} />
                </Routes>
            </Router>
        )
    }
}

