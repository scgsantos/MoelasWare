import React, { useState } from "react";
import "pages/create_test/select_quizzes/SelectQuizzes.css";
import "pages/create_test/preview/TestPreview.css";

import API from "api.js";

import { useNavigate } from "react-router-dom";
import { format } from 'react-string-format';

import { TEST_MENU_URL, TEST_PUBLISHED_URL, CREATE_TEST_URL } from "urls.js";
import history from 'history.js';


function CreateTest() {
  document.documentElement.style.setProperty("--base", "var(--pink)");

  // TODO?: find way to make quiz selection/visualization work without needing the array of ids (quizzes) rather than the array of objects

  // --- INITIALIZATION ---

  const [pagination, setPagination] = useState(false);
  var [page_num, setPage] = useState(1);  // number of current page of quizzes
  const [page_total, setPageTotal] = useState(1);   // Total number of quiz pages
  const [quizzes_per_page, setQuizzesPerPage] = useState(3); // quizzes to show per quizzes page

  const [text, setText] = useState(""); // test name
  var [quizzes, setQuizzes] = useState([]); // quizzes to be used in test

  var [tag, setTag] = useState(""); // Tag given in search bar

  const [isPage1, setIsPage1] = useState(true);

  //const [total_quizes, setTotalQuizzes] = useState(7);  // total number of quizzes in bd
  const [all_quizzes, setAllQuizzes] = useState([]);  // all quizzes that match current search
  const [searched_quizzes, setSearchedQuizzes] = useState([]);  // all quizzes that match current search

  const [pop_up, setPopUp] = useState(null);

  const [quizzes_count, setQuizzesCount] = useState(-1);

  if (quizzes_count == -1) {
    getQuizzesCount();
  }


  if (all_quizzes.length === 0) {
    getAllQuizes();
  }

  if (history.location.state != null && quizzes.length === 0) {
    setText(history.location.state.name);

    // Convert quizzes from objects to array of ids
    var q = [];

    for (let i = 0; i < history.location.state?.quizzes.length; i++) {
      q.push(history.location.state?.quizzes[i].id);
    }

    setQuizzes(q);
  }


  let navigate = useNavigate();

  async function getAllQuizes() {
    API.genQuizzes(quizzes_count)
      .then(data => {
        setAllQuizzes(data.quizzes.sort((a, b) => (a.id > b.id) ? 1 : -1));
        setSearchedQuizzes(data.quizzes.sort((a, b) => (a.id > b.id) ? 1 : -1));
        setPageTotal(Math.ceil(data.quizzes.length / quizzes_per_page))
      });
  }

  function getQuizzesCount() {
    API.getNumQuizzes()
      .then((data) => {
        setQuizzesCount(data.quizzes_count);
      });
  }

  // --- Handle misc. input ---

  function handleNameChange(e) {
    setText(e.target.value);
  }


  function handleCreateButtonChange() {
    if (quizzes.length > 0) {
      setIsPage1(false);
    }
  }

  function handleGoBackChange() {
    setIsPage1(true);
  }

  // --- SEARCH BAR ---

  // Check if a quizz has a tag matching current searched tag (lower/upper case differences dont matter)
  function quizHasMatchingTag(quiz, tag) {
    for (let i = 0; i < quiz.tags.length; i++) {
      if (quiz.tags[i].text.toUpperCase().indexOf(tag.toUpperCase()) === 0) {
        return true;
      }
    }
    return false;

  }

  function handleSearchChange(e) {
    setTag(e.target.value);


    if (e.target.value !== "") {
      var quizzes_matching_search = [];

      for (let i = 0; i < all_quizzes.length; i++) {
        if (quizHasMatchingTag(all_quizzes[i], e.target.value)) {
          quizzes_matching_search.push(all_quizzes[i]);
        }
      }

      setSearchedQuizzes(quizzes_matching_search);
      setPageTotal(Math.ceil(quizzes_matching_search.length / quizzes_per_page))

    } else {
      setSearchedQuizzes(all_quizzes);
      setPageTotal(Math.ceil(all_quizzes.length / quizzes_per_page))
    }

  }

  // -- NAVIGATION --

  function handleNextButtonChange() {
    if (text.length !== 0) {


      // Convert quizzes from ids to objects to send to preview page
      var q = [];

      for (let i = 0; i < quizzes.length; i++) {
        for (let j = 0; j < all_quizzes.length; j++) {
          if (quizzes[i] == all_quizzes[j].id) {
            q.push(all_quizzes[j]);
            break;
          }
        }
      }

      API.postTest(text, 1, quizzes); // TODO: get author -> logged in user

      history.push(CREATE_TEST_URL);

      navigate(TEST_PUBLISHED_URL,
        { state: { name: text, quizzes: q, previous_path: CREATE_TEST_URL } },
      );
      window.location.reload();
    }
  }


  function handleGoBackToMenu() {
    navigate(TEST_MENU_URL);
  }

  function handleQuizSelectionChange(quiz) {

    if (quizHasBeenSelected(quiz)) {
      var q = quizzes.filter(function(q) { return q !== quiz.id })
      setQuizzes(q);  // if quiz already in list, remove it
    } else {
      setQuizzes(quizzes.concat(quiz.id));    // if not, add
    }
  }

  // ----PAGINATION-----

  function togglePagination() {
    setPagination(!pagination);
  }

  function nextPage() {
    if (page_num + 1 > page_total) {
      setPage(1);
    } else {
      setPage(page_num + 1);
    }
  }

  function prevPage() {
    if (page_num - 1 <= 0) {
      setPage(page_total);
    } else {
      setPage(page_num - 1);
    }
  }


  function getPaginationSection() {
    if (pagination) {
      return (<section>
        <button className="preview-arrowButtons" style={{ float: 'left' }} onClick={() => prevPage()}>
          &lt;
        </button>

        <button className="preview-arrowButtons" style={{ float: 'right' }} onClick={() => nextPage()}>
          &gt;
        </button>

        <br />
        <h2 class="SelectQuizzes-centerText"> Page {page_num} </h2>
      </section>)
    } else {
      return null;
    }
  }
  function getPaginationArray() {
    if (pagination) {
      return searched_quizzes.slice((page_num - 1) * quizzes_per_page, page_num * quizzes_per_page);
    } else {
      return searched_quizzes;
    }
  }

  // --- POP UP WINDOW ---

  function renderAnswer(answer) {
    if (answer?.correct) {
      return <li className="quiz-correct"> {answer?.text} </li>
    } else {
      return <li className="quiz-wrong"> {answer?.text} </li>
    }
  }
  function renderJustification(answer) {
    if (answer?.correct) {
      return <div className="preview-justification"><h3> Justification:</h3> <br></br>{answer?.justification}</div>
    } else {
      return null;
    }
  }

  function handleQuizPreview(quiz) {
    API.getQuizAnswers(quiz.id)
      .then(data => {
        setPopUp(<div className="SelectQuizzes-windowList">
          <h1 className="SelectQuizzes-windowWrapper">{quiz.question}</h1>
          <ul className="preview-quizList">
            {data.answers.map((answer) => renderAnswer(answer))}
          </ul>
          {data.answers.map((answer => renderJustification(answer)))}

        </div>);
      });
  }

  function handleClick() {
    setPopUp(null);
  }

  // --- RENDERING ---

  function quizHasBeenSelected(quiz) {

    for (let i = 0; i < quizzes.length; i++) {
      if (quizzes[i] == quiz.id) {
        return true;
      }
    }
    return false;
  }

  function renderQuiz(quiz) {
    if (quizHasBeenSelected(quiz)) {
      return (<li style={{ cursor: 'pointer' }} onClick={() => handleQuizSelectionChange(quiz)}>
        <p style={{ color: 'green' }} onClick={() => handleQuizPreview(quiz)}>{quiz.name}</p>
        {quiz.tags.map((tag) => <text style={{ fontSize: '0.8rem' }}>{tag.text},&nbsp;</text>)}
        <br />
      </li>

      );

    } else {
      return (<li type="checkbox" style={{ cursor: 'pointer', backgroundColor: 'blue !important' }} onClick={() => handleQuizSelectionChange(quiz)}>
        <p style={{ color: 'black' }} onClick={() => handleQuizPreview(quiz)}>{quiz.name}</p>
        {quiz.tags.map((tag) => <text style={{ fontSize: '0.8rem' }}>{tag.text},&nbsp;</text>)}
        <br />
      </li>

      );
    }
  }

  function renderQuizList(id) {
    var quiz;

    for (let i = 0; i < all_quizzes.length; i++) {
      if (all_quizzes[i].id == id)
        return <li className="NumberOnly-quiz">{all_quizzes[i].name}</li>
    }

  }


  console.log(quizzes);
  if (isPage1) {
    return (
      <div className="NumberOnly-firstPage" onClick={() => handleClick()} >
        <h1 className="NumberOnly-title">Create a Test</h1>
        <h2 className="NumberOnly-subTitle">Choose Quizzes for the Test</h2>


        {getPaginationSection()}

        <section class="SelectQuizzes-listTest">
          <input placeholder="search the #tag you want here" type="text" value={tag} onChange={handleSearchChange} />

          <ul>
            {getPaginationArray().map((quiz) => renderQuiz(quiz))}
          </ul>
        </section>

        <section id="createTest">

          <button className="createTestButton" onClick={handleGoBackToMenu}>
            Go Back
          </button>
          &nbsp;&nbsp;

          &nbsp;&nbsp;
          <button className="createTestButtonn" onClick={handleCreateButtonChange}>
            Next
          </button>
        </section>


      </div>

    );
  } else {
    return (
      <div className="NumberOnly-secondPage">
        <h1 className="NumberOnly-title">Create a Test</h1>
        <h2 className="NumberOnly-subTitle">Random Test</h2>

        <div className="NumberOnly-inputDiv">
          <h1 className="NumberOnly-inputTitle">{"Name your test"}</h1>
          <input
            className="NumberOnly-inputText"
            type="text"
            name="name"
            value={text}
            onChange={handleNameChange}
          />
           <h2 className="NumberOnly-errorInput">
            {text.length > 0 ? "" : "Name is mandatory"}
          </h2>
        </div>

        <h3 className="NumberOnly-title"> Chosen Quizzes: </h3>
        <ul className="NumberOnly-quizList">
          {quizzes.map((id) => renderQuizList(id))}
        </ul>


        <div className="NumberOnly-Publish-GoBack-buttons">
          <button className="NumberOnly-GoBackbutton" onClick={handleGoBackChange}>
            Go Back
          </button>

          <button
            className="NumberOnly-NextButton"
            onClick={handleNextButtonChange}
          >
            Next
          </button>
        </div>
      </div>
    );
  }


}

export default CreateTest;
