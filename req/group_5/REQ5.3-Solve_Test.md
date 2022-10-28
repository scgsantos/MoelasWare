# User Story - "SOLVE TEST":
* As a user, I want to solve a test so that I can check my knowledge.
* Comment - The user must be able to see the obtained grade

# Layouts
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)

# ---REQ_3.Solve_test - USE CASE---

# Primary Actor:
* User as a solver

# Stakeholders and interests:
* Solver - wants to solve an available test and check the grade obtained

# Preconditions:
* A valid user is logged in
* The user has created at least one test/quizz
* The application has at least one available test for solving

# Success guarantee:
* The user solves the test and sees the assigned grade
* The user sees the correct answers
* The test is registered as done for that user in the DB
* The answers given by the user are stored in the DB

# Trigger and Main Success Scenario (Happy Path):
* 0. The user selects the test he wants to solve
* 1. The user chooses an option/answer for each question
* 2. The user submits the test after answering all questions
* 3. The user gets its grade displayed
* 5. The user gets the correct answers displayed and might also watch the solutions, he can choose to skip both by pressing a button
* 6. The user gets redirected to the tests menu

# Extentions or Alternative paths:
* 1-a. The user wants to stop solving the test
*   1-a.1 The user presses a button that is displayed that will lead him to the tests menu, the test is saved and he will be able to finish it in the future
*   1-a.2 The test that was beeing solved is removed from the available tests 
* 2-a. The user doesn't meet the requirements to solve a test //erro a obter teste
*   2-a.1. System display an error message saying the User is not able to solve a test
* 3-a. Error requesting the selected test to DB
*   3-a.1. System display an error message and a button to try again
* 4-a. The user didn't answered to a one or more questions leaving them in "blank"
*   4-a.1. When calculating the grade, not answered questions count as "0"
* 5-a. Error requesting the test solutions to DB
*   5-a.1 Display an error message saying it was not possible to get the solutions, the grade obtained and a button to redirect to the tests menu


# TESTS:

* 1 - Initial State
* - User is not logged in
* 2 - Test
* - Try to solve a test without being logged in
* 3 - Expected Result
* - If the user is not logged in, the system shouldn't allow the user to solve the test 

* 1 - Initial State
* -  User didn't create a test/quizz
* 2 - Test
* - Try to solve a test without having created at least one test/quizz
* 3 - Expected Result
* - If the user hasn't created a test yet, the system shouldn't allow the user to solve the test 

* 1 - Initial State
* - User has already solved one specific test
* 2 - Test
* - Try to resolve the very same test once again
* 3 - Expected Result
* - If the user has already salved the test in question, the system shouldn't allow the user to solve the test

* 1 - Initial State
* - User is solving the test
* 2 - Test
* - Try to cancel the test resolution while answering it
* 3 - Expected Result
* - If the user is solving the test and tries to cancel it's resolution, the system should allow him and he should return to the tests menu and he will still be able to finish it later

* 1 - Initial State
* - User has solved the test
* 2 - Test
* - User has solved the test, grade has already been displayed and tries to skip the solutions panel
* 3 - Expected Result
* - If the user has solved the test and the grade has been displayed, the system should allow him to skip that panel
