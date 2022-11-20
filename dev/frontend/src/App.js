import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import "./HallOfFame.css";
import "./CreateQuiz.css";
import "./common.css";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Users from "./pages/users";
import Tests from "./pages/tests";
import History from "./components/history";
import CreateQuiz from "./pages/Create a Quiz/index";
import NewQuiz from "./pages/Create a Quiz/NewQuiz";
import Drafts from "./pages/Create a Quiz/Drafts";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/users" element={<Users />}>
          <Route path=":id/" element={<History selected="users" />} />
        </Route>
        <Route path="/tests" element={<Tests />}>
          <Route path=":id" element={<History selected="tests" />} />
        </Route>

        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/createquiz/new" element={<NewQuiz />} />
        <Route path="/createquiz/drafts" element={<Drafts />} />
      </Routes>
    </Router>
  );
}

export default App;
