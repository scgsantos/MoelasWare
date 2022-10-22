# **History and Hall Of Fame**
# **User story**
*	As a user I want to view the other users performance in order to compare results

# **Use case 2** 
*   As a user I want a page to be able to view all attempts of a given test

## **Primary actor: User**
## **Level: User goal**

## **Prerequisites**
* None (both authenticated and non authenticated users should be able to get access to History & Hall of Fame)

## **Success Guarantee**
* When searching for a particular test there should be a list with all the users that took that test

## **Happy Path**
*   1. Whenever the user reaches History & Hall of Fame page a list with all the tests is displayed
*   2. The user chooses one of the displayed tests 
*   3. All participants in that test are displayed

## **Extensions or Alternative Paths**
1. 
*   There are no registered users or tests
*   A message is displayed informing there are no users or tests

2. 
*   The user chooses a test which hasn't yet been taked by any user
*   A message is displayed informing that no users have taken that test
