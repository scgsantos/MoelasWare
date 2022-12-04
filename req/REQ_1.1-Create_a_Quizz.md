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

The user submits a new Quiz, with a name, a description and a category (tag)

##** Main Success Scenario**

1. User gets a form like page where they fill the quiz with: a name (which will act as a identifier for the quizz), a description and a question, which as 6 possible answers with only 1 being the correct one and a justification for each answer
2. User applies a category (tag) from a pre-conditioned list (1), and submits the quiz
3. User receives a notification which says that the quiz was submited for review

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


## Extensions
		
* 1. (a) The conditions about filling a quiz are not met:
        1. The app does not let you submit the quiz if you have not chosen a question name, descrition and/or a category for the quiz 
		2. Quiz is saved if it was not completed but had the question name and the category filled, being added to the list of unfinished quizzes
		
* 2. (a) Web failure of any sort during submission:
		1. Quiz current state is saved and can be submited in the resume a previously created quiz option

