import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import "./App.css";
import "./common.css";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Users from "./pages/users";
import Tests from "./pages/tests";
import History from "./components/history";

import QuizList from "./QuizList.js";

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
        <Routes>
            <Route path="/create/test/random" element={<CreateRandomTest />} />
        </Routes>
      </Routes>
    </Router>
  );
}

export default App;
