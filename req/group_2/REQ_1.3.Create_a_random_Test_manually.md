## Use Case 3
Create test by manually picking quizzes

### Primary Actor

User

### Level

User goal

### Precondition 

* User must be logged in.
* User must have reviewed at least 3 quizzes.

### Success Guarantee

The server creates a new test record with the selected quizzes and name.

### Main Success Scenario

1. User selects to create a test by manually picking quizzes.
2. User gets a list of all available quizzes, optionally filtered by tags.
3. User selects which quizzes to include in the test.
4. User gives the test a name.
5. User submits the test and the server creates a record.
6. The test becomes available for students to solve.

### Extensions

* 2. (a) There are no valid questions to be chosen for the selected tags:
        1. The app suggests other tags.
* 5. (a) Web failure of any sort during submission:
        1. The user's selection and test name are cached in the browser (or in the server?).
        2. User either backs out of this use case or tries again.
