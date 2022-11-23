import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "common.css";
import "App.css";

import Header from "components/Header";

// Group 2
import CreateRandomTest from "pages/create_test/number_only/NumberOnly.jsx";
import Preview from "pages/create_test/preview/Preview.jsx";
import CreateTestMenu from "pages/create_test/menu/CreateTestMenu.jsx";
import CreateRandomTestWithSpecs from "pages/create_test/number_and_tags/NumberAndTags.jsx";
import CreateTest from "pages/create_test/select_quizzes/SelectQuizzes.jsx";
import CreateTestLastPage from "pages/create_test/preview/LastPage.jsx";


// Group 3
import ReviewQuizPage from "pages/review_quiz/ReviewQuizPage.jsx";
import ReviewAQuizPage from "pages/review_quiz/ReviewAQuizPage.jsx";

// Group 4
import Home from "pages/Home.jsx";
import Profile from "pages/profile/Profile.jsx";
import Users from "pages/hall_of_fame/Users.jsx";
import Tests from "pages/hall_of_fame/Tests.jsx";
import CreateQuiz from "pages/create_a_quiz/index";
import NewQuiz from "pages/create_a_quiz/NewQuiz";
import Drafts from "pages/create_a_quiz/Drafts";
import History from "components/History.jsx";

// Group 5
import MainSelectionPage from 'pages/solve_test/AllTests.jsx';
import SingleTestPage from 'pages/solve_test/SingleTest.jsx';
import SolveTest from 'pages/solve_test/SolveQuizz.jsx';
import GradeTestSolved from 'pages/solve_test/SolvedAllQuizzes.jsx';
import TestGradePreviews from 'pages/solve_test/Resolution.jsx';

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
import history from "history.js";

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

        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/createquiz/new" element={<NewQuiz />} />
        <Route path="/createquiz/drafts" element={<Drafts />} />

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
        <Route exact path={REVIEW_QUIZ_URL + ":id"} element={<ReviewAQuizPage />} />
      </Routes>
    </Router>
  );
}


export default App;
