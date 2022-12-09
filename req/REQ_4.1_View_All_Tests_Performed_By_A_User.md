# Use case 1 

*   As a user I want a list that displays all tests performed by a specific user.

## **Primary actor **

* User

## **Level**

* User goal

##** Prerequisites**

* The user must be registered and logged in

##** Success Guarantee**

* The user is able to view a list that displays all tests performed by a specific user.

##** Happy Path**
1. Whenever the user reaches History & Hall of Fame he chooses the "Users" option
2. A list with all the users is displayed, optionally filtered by the name/email inserted in the search bar above the list 
4. The user clicks the history button of a specific user 
5. All tests taken by that user are displayed with the name, tag and author of the test.

##Alternative Path

* 1.    (a) There are no registered users or tests
            1. A message is displayed informing there are no users or tests

* 2.    (a) The user inserted doesn't exist
            1. The row appears empty

* 3.    (a) The selected user is yet to take a test
            1. The "history" button isn't visible
