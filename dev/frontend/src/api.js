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

  static getQuizzes() {
    return this.makeRequest("api/quizzes");
  }

  static getTests() {
    return this.makeRequest("api/tests/")
  }

  static login(username, password) {
    return this.makeRequest("api/token/", "POST", { username: username, password: password })
  }

  // TODO: implement
  static manel() { }
}


export default API;

