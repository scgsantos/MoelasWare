import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function TestsList() {
  const [tests, setTests] = useState([]);
  const testsHeader = [
    "TEST ID",
    "TIMES TAKEN",
    "TAG",
    "AUTHOR",
    "DATE MODIFIED",
  ];

  //const numAscending = [...tests].sort((a, b) => a.id - b.id);

  /*
  const fetchData = () => {
    fetch("../tests_data.json")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
*/

useEffect(() => {
  fetch("http://localhost:8000/api/tests", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => setTests(data.submissions_by_test));
}, []);


  const [selectedBtn, setSelectedBtn] = useState("");
  const navigate = useNavigate();

  const handleBtnClick = (selectedBtn) => {
    setSelectedBtn(selectedBtn);
    console.log(selectedBtn.target.id);
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
              <td>{Object.values(t)[0][0]}</td>
              <td>
                {Object.values(t)[0][1]}
                {Object.values(t)[0][1] > 0 && (
                  <button
                    className="btn"
                    id={Object.values(t)[0][0]}
                    onClick={(e) => handleBtnClick(e)}
                  >
                    history
                  </button>
                )}
              </td>
              <td>{Object.values(t)[0][2]}</td>
              <td>{Object.values(t)[0][3]}</td>
              <td>NaN</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </section>
  );
}

export default TestsList;
