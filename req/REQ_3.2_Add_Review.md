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
* The user can see every info on the quiz and give it a approval/refusal. He can also opt to cancel and review it later.

## **Happy Path**

1. The reviewer can see the name, tag, description, all the answers (having the correct one highlighted in green) and justifications. 
2. The reviewer writes a justification explaining his veredict
3. The user selects accept or reject

## Alternative Path

* 1.    (a) The reviewer aproves the quiz
            1. The approve counter on the quiz is incremented
                    1. If it's the third approval, the quiz is published and able to be inserted on a test
                
* 2.    (a) The reviewer reproves the quiz
            1. The quiz is sent back to the unfinished quizz
            2. The review of this quiz is unassigned from all the users
            
* 3.    (a) The reviewer cancels the review
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
