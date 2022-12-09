# Use case 2 

* View all attempts of a given test

## **Primary actor **

* User.

## **Level**

* User Goal.

## **Prerequisites**
*  The user must be registered and logged in to access History & Hall of Fame
*  There is at least 1+ test published

## **Success Guarantee**
*  When selecting a particular test from the list, all the users that took that test are displayed

## **Happy Path**
1. Whenever the user reaches History & Hall of Fame he chooses the "Tests" option
2. A list with all the tests is displayed
3. The User clicks the "history" button of a specific test 
4. All participants in that test are displayed sorted in descending test score

## Alternative Path

* 1.    (a) There are no registered users or tests
            1. A message is displayed informing there are no users or tests
            
* 2.    (a) The user chooses a test which hasn't yet been taken by any user
            1. A message is displayed informing that no users have taken that test
