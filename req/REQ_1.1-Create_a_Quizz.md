# Use Case 1

* Create a new Quiz

##** Primary Actor**

* User

##** Level**

* User goal

##** Precondition** 

* User must be logged in.
* User selects the option to create a quiz.

##** Success Guarantee**

The user submits a new Quiz with: a name, a tag, a question, a description, 6 possible answers (being only 1 correct) and a justification for all the possible answers.

##** Main Success Scenario**

1. The user accesses the Create Quiz page
2. The user presses "New Quiz"
3. The user gets to a form like page.
4. The user inputs a name, a description and a question. He also chooses one tag from the *Pre-conditioned quiz tags* (1).
5. The user inputs a answers in the six options, giving them a justification.
6. The user clicks a check-bubble to indicate the right answer
7. The user chooses either "Submit" or "Save as draft".
8. User receives a notification with the state of the quiz

###(1) Pre-conditioned quiz tags
- PM  (Gestão de projecto)
- REQ (requisitos)
- A&D (Arquitectura e design)
- IMP (Implementação)
- TST (testes e qualidade de produto)
- V&V (Verification and Validation)
- DEP (deployment)
- CI  (Continuous practices)
- PRC (boas-práticas e qualidade de PRocessos)
- PPL (Peopleware)
- CCM (Configuration and Change Management)
- RSK (Risk management)


## Alternative Path

1. (a) Web failure of any sort during creation:
        1. Quiz current state is saved as a draft and the user can finish the submition later
        
2. (a) The user selects "Submit"
        1. (a) All the information hasn't yet been filled:
                1.The app alerts the user with the following mensage:  "Submit: You must enter all fields".
        2 (a) Every information is filled correctly
                1. The app sends the quiz for review
                2. The app alerts the user with the following message: "Submit: The quiz as been sent to review"

2. (a) The user selects "Save as draft"
        1.  (a) The Quizz doesn't have a name
                1.The app alerts the user with the following mensage:  "Submit: You must enter all fields".
            (b) The Quiz has a name
                1. The app sends the quiz for review
                
        

		


