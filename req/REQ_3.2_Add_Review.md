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
* Have selected a quiz assigned for his reviewal

## **Success Guarantee**
* The user can see every info on the quiz and give it a approval/refusal. He can also opt to cancel and review it later.

## **Happy Path**

1. The reviewer can see the name, tag, description, all the answers (having the correct one highlighted in green) and justifications. 
2. The reviewer writes a review veredict justification.
3. The user selects accept/reject/cancel

## Alternative Path

* 1.    (a) The reviewer aproves the quiz
            1. The approve counter on the quiz is incremented
                    1. If it's the third approval, the quiz is published and able to be inserted on a test
                
* 2.    (a) The reviewer reproves the quiz
            1. The quiz is sent back to the unfinished quizz
            2. The review of this quiz is unassigned from all the users assigned to her
            
* 3.    (a) The reviewer cancels the review
            1. The quiz remains in his "to be reviewed" list and if anything is writen in the justification text box it's eliminated.

## Test Cases

###Test 1 - [Check for approve counter]
* User
User approves a quiz
User checks the approve counter

* System
1. Checks current approval counter and increments
2. If current approval counter is 3 or more it doesn't display the quiz and under review
3. Display current approval counter

* OK/NOK 

###Test 2 - [See justifications given by the creator]
* User
User selects a quiz from the quiz list for review

* System
1. Get justification for each answer
2. Display justification for answers

* OK/NOK 

###Test 3 - [Give a justification to the review]
* User
User selects a quiz from the quiz list for review
User writes a review veredict justification
User presses the Submit/Reject button

* System
1. Verifies contents of review justification
2. Sends message "Quiz accepted" if Submit
2. Sends message "Quiz rejected" if Reject

* OK/NOK 

###Test 4 - [Review justification attached to the review]
* User
User selects a quiz from the quiz list for review

* System
1. Display review justification text box

* OK/NOK 

###Test 5 - [Refused quiz staying on another reviewer list]
* User
User1 selects a quiz from the quiz list for review
User1 writes a review veredict justification
User1 presses the Reject button
User2 logs in
User2 selects review page

* System
1. Display quiz information
2. Mark quiz as draft
3. Only displays quizes for review, not drafts

* OK/NOK 

###Test 6 - [Refused quiz appear in drafts page]
* User
User opens Create a Quiz page
User presses Draft button

* System
1. Display quiz marked as draft

* OK/NOK 


# **Layouts**
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)
