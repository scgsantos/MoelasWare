# Use case 2

* Submit a test

## **Primary actor **

* User.

## **Level**

* User Goal.

## **Prerequisites**

* User has registered and is logged in
* The user as reviewed 3+ quizzes
* There is at least one test in the database
* User chose a Test to solve

## **Success Guarantee**

*  The User submits a solved test

## **Happy Path**
*   1. The user can select an answer he deems correct to all the quizzes in the test
*   2. The user can submit the test
*   3. The user gets a confirmation message that the solution has been submited  

## Extensions

* 1.    (a) The user doesn't answer all the quizzes
            1. The user gets a warning to finish all the quizzes

##** TESTS **
* Test should be submitted to the database
* Is the test is removed from the list of the user's recommended tests
* Is the user redirected to the home page
* Is the user atributed a score for the test
* Does prompt the questions from the correct test
* Does prompt the correct number of answer choices for each question
* Does prompt the correct answer choices for each question
