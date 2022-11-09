
import React, { Component } from "react";
import { Link, Routes, Route, useRoutes, BrowserRouter as Router} from "react-router-dom";

import App from "./App.js";
import MainSelectionPage from './pages/Req_4_1AllTests';
import SingleTestPage from './pages/Req_4_1SingleTest';
import Req_4_1_2 from './pages/Req_4_1SingleTest';
import SolveQuizz from './pages/Req_4_2SolveQuizz';
import SolvingQuizz from './pages/Req_4_2SolvedAllQuizzes';
import Req_4_2_3 from './pages/Req_4_2_3';
import Req_4_3 from './pages/Req_4_3';

import history from './history.js';

export default class App_Routes extends Component {
    render() {
        return (
            <Router history={history} location={history.location}>
                <Routes>
                    <Route path="/" exact element={<App/>} />
                    <Route path="/selecttest" element={<MainSelectionPage/>} >
                        <Route path=":test" element={<SingleTestPage/>} />
                    </Route>
                    <Route path="/solvequizz" element={<SolveQuizz/>} >
                        <Route path=":quizz" element={<SolvingQuizz/>} />
                    </Route>
                </Routes>
            </Router>
        )
    }
}

