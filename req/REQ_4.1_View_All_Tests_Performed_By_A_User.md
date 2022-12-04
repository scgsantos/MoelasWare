# Use case 1 

*   As a user I want a list that displays all tests performed by a specific user.

## **Primary actor **

* User

## **Level**

* User goal

##** Prerequisites**
* The user must be registered and logged in


##** Success Guarantee**
* Any user is able to view a list that displays all tests performed by a specific user.

##** Happy Path**
*   1. Whenever the user reaches History & Hall of Fame a list with all the users is displayed
*   2. a) The user inserts the name/email of one user in the search bar above the list and clicks the history button of that user
*   2. b) The user clicks the history button of a specific user 
*   3. All tests taken by that user are displayed

##Extensions

* 1.    (a) There are no registered users or tests
            1. A message is displayed informing there are no users or tests

* 2.    (a) The user inserted doesn't exist
            1. A message is displayed informing the user inserted doesn't exist

* 3.    (a) The user inserted is yet to take a test
            1.  A message is displayed informing the user inserted hasn't taken any tests.
