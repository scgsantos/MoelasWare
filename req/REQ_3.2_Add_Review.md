#Use Case 2	

*   As a reviewer I want to give a quiz a review, giving it a justification for my approval/refusal 

## **Primary actor **

* User

## **Level**

* User goal


## **Prerequisites**
* Be logged in
* Have created at least 1 quiz
* Have been assigned 1+ quizzes to review
* Have selected a quiz from the quizz-list page to review

## **Success Guarantee**
* The User can give a review to a quiz

## **Happy Path**
* The reviewer has page where he can see all the questions and answers about the selected quiz
* The reviewer gives a comment about the quiz he's reviewing
* The reviewer approves or refuses the quiz


## Extensions
* 1.    (a) The reviewer reproves the quiz
            1. The quiz is sent back to the unfinished quizz
            
* 2.    (a) The reviewer cancels the review
            1. The quiz remains in his "to be reviewed" list and if anything is writen in the justification text box it's eliminated.

## **TESTS**
* Can he approve a quiz with only 1 approval
* Does it count as solving while he is reviewing
* Can he see the justifications given to the questions by the creator 
* Can the reviewer give a justification to the quiz
* Is the justifications attached to the review
* Does the refused quizz stay on another reviewers list after being refused
* Does the refuse quizz go back to the creators creating-page
(to be updated)

# **Layouts**
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)
