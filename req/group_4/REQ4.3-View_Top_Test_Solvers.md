# **History and Hall Of Fame**
# **User story**
*	As a user I want to view the other users performance in order to compare results

# **Use case 3** 
*   As a user I want a page to be able to view the users who have solved the most tests as well as the number of correct answers

## **Primary actor: User**
## **Level: User goal**

## **Prerequisites**
* None (both authenticated and non authenticated users should be able to get access to History & Hall of Fame)

## **Success Guarantee**
* When searching for a particular user there should be a list with all the taken tests

## **Happy Path**
*   1. Whenever the user reaches History & Hall of Fame page an input field is displayed
*   2. The user inserts the name/email of one user 
*   3. All tests taken by that user are displayed

## **Extensions or Alternative Paths**
1. 
*   There are no registered users or tests
*   A message is displayed informing there are no users or tests

2. 
*   The user inserted doesn't exist
*   A message is displayed informing the user inserted doesn't exist

3. 
*   The user inserted is yet to take a test
*   A message is displayed informing the user inserted hasn't taken any tests

