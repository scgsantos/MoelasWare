import React from 'react';
import CreateRandomTest from "./pages/req_2_1";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import history from './history';

import "./common.css";


export default class App extends React.Component() {
  render() {
    return (
      <div className="App">
        <h1> Home Page </h1>

        <form>
            <button  onClick={() => history.push('/RandomTest')}>Random Test</button>
          </form>
      </div>
    );
  }
}

