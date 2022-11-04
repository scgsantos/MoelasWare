import React from "react";

class QuizList extends React.Component {
  constructor() {
    super();
    this.state = { quizzes: [] };
    this.getFirstQuiz();
  }
  getFirstQuiz() {
    /*fetch("http://localhost:8000/api/quizzes/gen/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num_quizzes: this.props.num }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ quizzes: data.quizzes });
      });*/

    fetch("http://localhost:8000/api/tests/2")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ quizzes: data.test.quizzes });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.quizzes.map((quiz) => {
            return (
              <li className="quiz" key={`quiz-${quiz.id}`}>
                {quiz.question}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

//class Quiz extends React.Component {}

export default QuizList;
