# Use Case 3

* View Solution

##** Primary Actor **

* User.

##** Level **

* User goal.

##** Preconditions ** 

* A valid user is logged in
* The user has reviewed 3+ quizzes
* The application has at least one available test for solving
* The user as solved a test

##** Success Guarantee **



##** Happy Path **

* 1. The user can see the grade displayed of a test he just solved
* 2. The user can choose to see his answers
* 3. The quizzes are displayed with the user's answers in yellow and the correct answers in green
* 4. The user can see the justification given by the quizzes author to each question

## Extensions

* 1.    (a) The user wants to stop solving the test
            1. The user presses a button that is displayed that will lead him to the tests menu, the test is saved and he will be able to finish it in the future
            2. The test that was beeing solved is removed from the available tests

* 2.    (a)The user doesn't meet the requirements to solve a test
            1. System display an error message saying the User is not able to solve a test

* 3.    (a)The user didn't answered to a one or more questions leaving them in "blank"
            1. System display an error message saying there are questions that need to be answered
        
##** Layouts **

https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)

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
