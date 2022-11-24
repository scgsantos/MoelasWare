
import React, { Component } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import App from "./App.js";
import MainSelectionPage from './pages/Req_4_1AllTests';
import SingleTestPage from './pages/Req_4_1SingleTest';
import SolveaTest from './pages/Req_4_2SolveQuizz';
import GradeTestSolved from './pages/Req_4_2SolvedAllQuizzes';
import TestGradePreviews from './pages/Req_4_3Resolution';

import history from './history.js';

export default class App_Routes extends Component {
    render() {
        return (
            <Router history={history} location={history.location}>
                <Routes>
                    <Route path="/" exact element={<App />} />
                    <Route path="/selecttest" element={<MainSelectionPage />} >
                        <Route path=":test" element={<SingleTestPage />} />
                    </Route>
                    <Route path="/solvequizz" element={<SolveaTest />} >
                        <Route path=":test" element={<SolveaTest />} />
                    </Route>
                    <Route path="/grade" element={<GradeTestSolved />} >
                        <Route path=":test/result" element={<GradeTestSolved />} />
                    </Route>
                    <Route path="/solved" element={<TestGradePreviews />} >
                        <Route path=":test" element={<TestGradePreviews />} />
                    </Route>
                </Routes>
            </Router>
        )
    }
}

