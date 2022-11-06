## Use Case 1

Create Quiz

## Layouts

https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)

### Primary Actor

User

### Level

User goal

### Precondition 

* User must be logged in.
* User selects the option to create a quiz.


### Success Guarantee

The user submits a new Quiz, with a name and a category

### Main Success Scenario

1. User gets a form like page where they fill the quiz, a question which as 6 possible answers with only 1 being the correct one and a justification for each answer
2. User applies a category to the quiz, and submits the quiz
3. User receives a notification which says that the quiz was submited for review


### Extensions
		
* 1. (a) The conditions about filling a quiz are not met:
        1. The app does not let you submit the quiz if you have not chosen a question name and/or a category for the quiz 
		2. Quiz is saved if it was not completed but had the question name and the category filled, being added to the list of unfinished quizzes
		
* 2. (a) Web failure of any sort during submission:
		1. Quiz current state is saved and can be submited in the resume a previously created quiz option
