# Use case 1 

* Select a review

## **Primary actor **

* User

## **Level**

* User goal

## **Prerequisites**

* Be logged in
* Have created at least 1 quiz
* Have been assigned 1+ quizzes to review

## **Success Guarantee**
* The user can see and choose quizzes from a list of assigned quizzes for him to review

## **Happy Path**
* The reviewer has a review-list page
* Each review listed as been assigned to him and 2 other reviewers on the moment of creation
* The reviews on the page have the following information: Quiz name, Tags, Creator, Creation Date and Reviews (number of approvals by other users)
* The reviewer can select a quiz that he wants to start reviewing by pressing it's row


## **TESTS**

###Test 1 - List of quizzes to review
* User
- Goes to the review page and has a list of quizzes to review

* System
1. Search the user-assiged quizzes
2. Displays  the user-assigned quizzes

* OK/NOK


###Test 2 - Choose quiz to review
* User
- Goes to the review page
- Selects a quiz to review from the list
- Presses it

* System
1. Search the chosen quiz
2. Displays the details of the chosen quiz

* OK/NOK


###Test 3 - Confirm if the user has already created a quiz
* User
- Goes to the review page without having created a quiz

* System
1. Verifies if the user has already create a quiz
2. Sends message: "You must create a quiz first" 

* OK/NOK


# **Layouts**
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

