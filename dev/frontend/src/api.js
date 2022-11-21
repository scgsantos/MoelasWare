import config from "config.js";

// const config = { apiUrl: "https://api.moelasware.xyz/" };

const ACCEPT_JSON = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class API {
  static getBearerToken() {
    return sessionStorage.access === undefined ? {} : {
      "Authorization": "Bearer " + sessionStorage.access,
    }
  }

  static makeRequest(
    path,
    method = "GET",
    body = undefined,
    params = undefined,
    headers = undefined
  ) {
    const searchParams = new URLSearchParams(params);
    const pathURL = new URL(path, config.apiUrl);
    searchParams.forEach((value, key) => pathURL.searchParams.set(key, value));

    return fetch(pathURL, {
      method: method,
      headers: { ...headers, ...ACCEPT_JSON, ...API.getBearerToken() },
      body: method == "GET" ? undefined : JSON.stringify(body),
    }).then((response) => response.json());
  }

  // Get test by ID
  static getTest(test_id) {
    return this.makeRequest(`tests/${test_id}/`);
  }

  // Get all submissions of a test
  static getTestSubmissions(test_id) {
    return this.makeRequest(`tests/${test_id}/submissions/`);
  }

  // Get all tests
  static getTests() {
    return this.makeRequest("tests/");
  }

  // Get a tag by ID
  static getTag(tag_id) {
    return this.makeRequest(`tags/${tag_id}/`);
  }

  // Get all tags
  static getTags() {
    return this.makeRequest("tags/");
  }

  // Get num_quizzes quizzes with tags in tags list (no tags ==> any tags allowed)
  static genQuizzes(num_quizzes, tags) {
    return this.makeRequest("quizzes/gen/", "POST", {
      num_quizzes: num_quizzes,
      tags: tags,
    });
  }

  // Get all possible answers for a given quiz
  static getQuizAnswers(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/answers/`
    );
  }

  // Get number of quizzes in db
  static getNumQuizzes() {
    return this.makeRequest("quizzes/count/");
  }

  // Get a quiz by ID
  static getQuiz(quiz_id) {
    return this.makeRequest(`quizzes/${quiz_id}/`);
  }

  // NOT YET IMPLEMENTED
  // Get all quizzes
  static getQuizzes() {
    return this.makeRequest("quizzes");
  }

  // Get all reviewers of a given quiz
  static getQuizReviewers(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/reviewers/`
    );
  }

  // NOT WORKING IN BACKEND
  // Create a quiz review
  static createQuizReview(quiz, reviewer, accepted, comment) {
    return this.makeRequest("quizzes/review/", "POST", {
      quiz: quiz,
      reviewer: reviewer,
      accepted: accepted,
      comment: comment,
    });
  }

  // Get all test submissions made by a given user
  static getUserSubmissions(user_id) {
    return this.makeRequest(
      `users/${user_id}/submissions/`
    );
  }

  // Get hall of fame
  static getHallOfFame() {
    return this.makeRequest("fame/");
  }

  // TODO: implement register

  // Get user login token
  static login(username, password) {
    let tokens = this.makeRequest("token/", "POST", {
      username: username,
      password: password,
    });

    tokens.then((data) => {
      sessionStorage.setItem("access", data.access);
      sessionStorage.setItem("refresh", data.refresh);
    }
    );
    return tokens;
  }

  // Refresh token
  static tokenRefresh(refresh) {
    return this.makeRequest("token/refresh/", "POST", {
      refresh: refresh,
    });
  }

  static logout() {
    return this.makeRequest("token/blacklist/", "POST", {
        refresh : sessionStorage.getItem("refresh"),
    }).then(() => {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
      }
      );
  }

  // THE FOLLOWING ENDPOINTS ARE NOT IMPLEMENTED IN BACKEND

  // Add revision
  static addRevision(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/`,
      "PATCH"
    );
  }

  // Post a quiz
  static postQuiz(question, accepted, answers) {
    return this.makeRequest("quizzes/", "POST", {
      question: question,
      accepted: accepted,
      answers: answers,
    });
  }

  // Get rejected reviews
  static getRejectedReviews(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/revisions/`
    );
  }

  // Get a quizz's reviews
  static getQuizzReview(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/reviews/`
    );
  }

  // Post a review
  static postQuizzReview(quiz_id) {
    return this.makeRequest(
      `quizzes/${quiz_id}/reviews/`,
      "POST"
    );
  }

  // Generate a new test
  static postTest(num_quizzes, allowed_tags, quizzes) {
    return this.makeRequest("tests/", "POST", {
      num_quizzes: num_quizzes,
      allowed_tags: allowed_tags,
      quizzes: quizzes,
    });
  }

  // Get all submissions of a given test
  static getAllTestSubmissions(test_id) {
    return this.makeRequest(
      `tests/${test_id}/submissions/`
    );
  }

  // Add new submission
  static postSubmission(test_id,) {
    return this.makeRequest(
      `tests/${test_id}submissions`,
      "POST"
    );
  }

  // Get user with a given id
  static getUser(user_id) {
    return this.makeRequest(`users/${user_id}/`);
  }
}

export default API;
