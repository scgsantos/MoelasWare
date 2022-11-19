// import config from "config.js";
// import('./config.js')

const config = { svurl: "https://api.moelasware.xyz/" }


const ACCEPT_JSON = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};



class API {
  static makeRequest(path, method = "GET", body = undefined, params = undefined, headers = undefined,) {
    const searchParams = new URLSearchParams(params);

    // TODO: change url to URL()

    return fetch(config.svurl + path + searchParams.toString(), {
      method: method,
      headers: { ...headers, ...ACCEPT_JSON },
      body: method == "GET" ? undefined : JSON.stringify(body),
    }).then((response) => response.json());
  }


  // Get test by ID
  static getTest(test_id) {
    return this.makeRequest("api/tests/", test_id.toString() + "/");
  }

  // Get all submissions of a test
  static getTestSubmissions(test_id){
    return this.makeRequest("api/tests/", test_id.toString() + "/submissions/")
  }

  // Get all tests
  static getTests() {
    return this.makeRequest("api/tests/")
  }

  // Get a tag by ID
  static getTag(tag_id){
    return this.makeRequest("api/tags/", tag_id.toString() + "/");
  }

  // Get all tags
  static getTags(){
    return this.makeRequest("api/tags/");
  }

  // Get num_quizzes quizzes with tags in tags list (no tags ==> any tags allowed)
  static getNumberOfQuizzes(num_quizzes, tags){
    return this.makeRequest("api/quizzes/gen/", "POST", { num_quizzes: num_quizzes, tags: tags })
  }

  // Get all possible answers for a given quiz
  static getQuizAnswers(quiz_id){
    return this.makeRequest("api/quizzes/", quiz_id.toString() + "/answers/");
  }

  // Get number of quizzes in db
  static getNumQuizzes(){
    return this.makeRequest("api/quizzes/count/");
  }

  // Get a quiz by ID
  static getQuiz(quiz_id){
    return this.makeRequest("api/quizzes/" + quiz_id.toString() + "/");
  }

    // NOT YET IMPLEMENTED
  /*static getQuizzes() {
    return this.makeRequest("api/quizzes");
  }*/

  // Get all reviewers of a given quiz
  static getQuizReviewers(quiz_id){
    return this.makeRequest("api/quizzes/" + quiz_id.toString() + "/reviewers/");
  }

  // TODO: implement
  static createQuizReview(){}

  // Get all test submissions made by a given user
  static getUserSubmissions(user_id){
    return this.makeRequest("api/users/" + user_id.toString() + "/submissions/");
  }

  // Get user login token
  static login(username, password) {
    return this.makeRequest("api/token/", "POST", { username: username, password: password })
  }


}


export default API;

