import config from "config.js";

const ACCEPT_JSON = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class API {
    static makeRequest(
        path,
        method = "GET",
        body = undefined,
        params = undefined,
        headers = undefined
    ) {
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
    static getTestSubmissions(test_id) {
        return this.makeRequest(
            "api/tests/",
            test_id.toString() + "/submissions/"
        );
    }

    // Get all tests
    static getTests() {
        return this.makeRequest("api/tests/");
    }

    // Get a tag by ID
    static getTag(tag_id) {
        return this.makeRequest("api/tags/", tag_id.toString() + "/");
    }

    // Get all tags
    static getTags() {
        return this.makeRequest("api/tags/");
    }

    // Get num_quizzes quizzes with tags in tags list (no tags ==> any tags allowed)
    static getNumberOfQuizzes(num_quizzes, tags) {
        return this.makeRequest("api/quizzes/gen/", "POST", {
            num_quizzes: num_quizzes,
            tags: tags,
        });
    }

    // Get all possible answers for a given quiz
    static getQuizAnswers(quiz_id) {
        return this.makeRequest(
            "api/quizzes/",
            quiz_id.toString() + "/answers/"
        );
    }

    // Get number of quizzes in db
    static getNumQuizzes() {
        return this.makeRequest("api/quizzes/count/");
    }

    // Get a quiz by ID
    static getQuiz(quiz_id) {
        return this.makeRequest("api/quizzes/" + quiz_id.toString() + "/");
    }

    // NOT YET IMPLEMENTED
    // Get all quizzes
    static getQuizzes() {
        return this.makeRequest("api/quizzes");
    }

    // Get all reviewers of a given quiz
    static getQuizReviewers(quiz_id) {
        return this.makeRequest(
            "api/quizzes/" + quiz_id.toString() + "/reviewers/"
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
            "api/users/" + user_id.toString() + "/submissions/"
        );
    }

    // Get hall of fame
    static getHallOfFame() {
        return this.makeRequest("api/fame/");
    }

    // Get user login token
    static login(username, password) {
        return this.makeRequest("api/token/", "POST", {
            username: username,
            password: password,
        });
    }

    // Refresh token
    static tokenRefresh(refresh) {
        return this.makeRequest("api/token/refresh/", "POST", {
            refresh: refresh,
        });
    }

    // THE FOLLOWING ENDPOINTS ARE NOT IMPLEMENTED IN BACKEND

    // Add revision
    static addRevision(quiz_id) {
        return this.makeRequest(
            "api/quizzes/" + quiz_id.toString() + "/",
            "PATCH"
        );
    }

    // Post a quiz
    static postQuiz(question, accepted, answers) {
        return this.makeRequest("api/quizzes/", "POST", {
            question: question,
            accepted: accepted,
            answers: answers,
        });
    }

    // Get rejected reviews
    static getRejectedReviews(quiz_id) {
        return this.makeRequest(
            "api/quizzes/" + quiz_id.toString() + "/revisions/"
        );
    }

    // Get a quizz's reviews
    static getQuizzReview(quiz_id) {
        return this.makeRequest(
            "api/quizzes/" + quiz_id.toString() + "/reviews/"
        );
    }

    // Post a review
    static postQuizzReview(quiz_id) {
        return this.makeRequest(
            "api/quizzes/" + quiz_id.toString() + "/reviews/",
            "POST"
        );
    }

    // Generate a new test
    static postTest(num_quizzes, allowed_tags, quizzes) {
        return this.makeRequest("api/tests/", "POST", {
            num_quizzes: num_quizzes,
            allowed_tags: allowed_tags,
            quizzes: quizzes,
        });
    }

    // Get all submissions of a given test
    static getAllTestSubmissions(test_id) {
        return this.makeRequest(
            "api/tests/" + test_id.toString() + "/submissions/"
        );
    }

    // Add new submission
    static postSubmission(test_id, ) {
        return this.makeRequest(
            "api/tests/" + test_id.toString + "submissions",
            "POST"
        );
    }

    // Get user with a given id
    static getUser(user_id) {
        return this.makeRequest("api/users/" + user_id.toString() + "/");
    }
}

export default API;
