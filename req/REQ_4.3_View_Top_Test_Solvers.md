# Use case 3 

* View top test solvers

## **Primary actor **

* User

## **Level**

* User goal

## **Prerequisites**
* None (both authenticated and non authenticated users should be able to get access to History & Hall of Fame)

## **Success Guarantee**
* When searching for a particular user there should be a list with all the taken tests

## **Happy Path**
*   1. Whenever the user reaches History & Hall of Fame page an input field is displayed
*   2. The user inserts the name/email of one user 
*   3. The user displayed has a button which will lead to all tests taken by him/her

## Alternative Path

* 1.    (a) There are no registered users or tests
            1. A message is displayed informing there are no users or tests
            
* 2.    (a) The user inserted doesn't exist
            1. A message is displayed informing the user inserted doesn't exist 
            
* 3.    (a) The user inserted is yet to take a test
            1. A message is displayed informing the user inserted hasn't taken any tests
