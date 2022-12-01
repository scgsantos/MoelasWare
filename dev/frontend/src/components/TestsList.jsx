import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import API from 'api.js';
function TestsList() {
  const [tests, setTests] = useState([]);
  const testsHeader = [
    "TEST NAME",
    "TIMES TAKEN",
    "TAG",
    "AUTHOR",
  ];

  useEffect(() => {
    API.getHallOfFameTests().then((data) => {
        setTests(data.submissions_by_test);
     });
  }, []);

  const [selectedBtn, setSelectedBtn] = useState("");
  const navigate = useNavigate();

  const handleBtnClick = (selectedBtn) => {
    setSelectedBtn(selectedBtn);
    navigate(`./${selectedBtn.target.id}`);
  };
  return (
    <section id="tests">
    <table>
      <thead>
        <tr>
          {testsHeader.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tests.map((t) => (
          <tr key={Object.values(t)[0][0]}>
            <td>{Object.values(t)[0][1]}</td>
            <td>
              {Object.values(t)[0][2]}
              {Object.values(t)[0][2] > 0 && (
                <button
                className="btn"
                  id={Object.values(t)[0][0]}
                  onClick={(e) => handleBtnClick(e)}
                  >
                  history
                </button>
              )}
            </td>
            <td>{Object.values(t)[0][3]}</td>
            <td>{Object.values(t)[0][4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Outlet />
  </section>
);
}

export default TestsList;
