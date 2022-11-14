import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./common.css";

import Header from "./components/header";

// Group 2
import CreateRandomTest from "./pages/create_test/number_only/req_2_1.js";
import Preview from "./pages/create_test/preview/preview.js";
import CreateTestMenu from "./pages/create_test/menu/CreateTestMenu.js";
import CreateRandomTestWithSpecs from "./pages/create_test/number_and_tags/req_2_2.js";
import CreateTest from "./pages/create_test/select_quizzes/req_2_3.js";
import CreateTestLastPage from "pages/create_test/preview/last_page";

// Group 4
import Home from "./pages/home";
import Profile from "./pages/profile";
import Users from "./pages/users";
import Tests from "./pages/tests";
import History from "./components/history";

import MainSelectionPage from './pages/Req_4_1AllTests';
import SingleTestPage from './pages/Req_4_1SingleTest';
import SolveTest from './pages/Req_4_2SolveQuizz';
import GradeTestSolved from './pages/Req_4_2SolvedAllQuizzes';
import TestGradePreviews from './pages/Req_4_3Resolution';

import ReviewQuizPage from "./pages/ReviewQuizPage";
import ReviewAQuizPage from "./pages/ReviewAQuizPage";

import {
  PROFILE_URL,
  USERS_URL,
  TESTS_URL,
  CREATE_RANDOM_TEST_URL,
  CREATE_TEST_URL,
  TEST_MENU_URL,
  TEST_PREVIEW_URL,
  TEST_PUBLISHED_URL,
  CREATE_TEST_WITH_TAGS_URL,
  SELECT_TEST_URL,
  SOLVE_TEST_URL,
  TEST_SOLVED_URL,
  TEST_GRADE_URL,
  REVIEW_URL,
  REVIEW_QUIZ_URL,
} from "urls.js";
import history from "./history.js";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route exact path={TEST_MENU_URL} element={<CreateTestMenu />} />
        <Route
          exact
          path={CREATE_RANDOM_TEST_URL}
          element={<CreateRandomTest />}
        />
        <Route exact path={CREATE_TEST_URL} element={<CreateTest />} />
        <Route exact path={TEST_PREVIEW_URL} element={<Preview />} />
        <Route
          exact
          path={CREATE_TEST_WITH_TAGS_URL}
          element={<CreateRandomTestWithSpecs />}
        />
        <Route exact path={TEST_PUBLISHED_URL} element={<CreateTestLastPage />} />

        <Route exact path={PROFILE_URL} element={<Profile />} />

        <Route exact path={USERS_URL} element={<Users />}>
          <Route exact path=":id" element={<History selected="users" />} />
        </Route>
        <Route exact path={TESTS_URL} element={<Tests />}>
          <Route path=":id" element={<History selected="tests" />} />
        </Route>

        <Route path={SELECT_TEST_URL} element={<MainSelectionPage />} >
          <Route path=":test" element={<SingleTestPage />} />
        </Route>
        <Route path={SOLVE_TEST_URL} element={<SolveTest />} >
          <Route path=":test" element={<SolveTest />} />
        </Route>
        <Route path={TEST_GRADE_URL} element={<GradeTestSolved />} >
          <Route path=":test/result" element={<GradeTestSolved />} />
        </Route>
        <Route path={TEST_SOLVED_URL} element={<TestGradePreviews />} >
          <Route path=":test" element={<TestGradePreviews />} />
        </Route>

        <Route exact path={REVIEW_URL} element={<ReviewQuizPage />} />
        <Route exact path={REVIEW_QUIZ_URL} element={<ReviewAQuizPage />} />
      </Routes>
    </Router>
  );
}


export default App;
