## Use Case 1

Create Quiz

### Primary Actor

User

### Level

User goal

### Precondition 

* User must be logged in.


### Success Guarantee

The user submits a new Quiz, with a name and a category

### Main Success Scenario

1. User selects the option to create a quiz
2. User gets a form like page where they fill the quiz, a question which as 6 possible answers with only 1 being the correct one and a justification for each answer
3. User applies a category to the quiz, and submits the quiz
4. User receives a notification which says that the quiz was submited for review


### Extensions

* 1. (a) User created a quiz that was not finished:
		1. User is also presented with the option to resume a previosly created quiz.
*	 (b) User had one or more quizzes rejected:
		1. User is also presented with the option to review a created quiz, where they can apply the necessary changes. 
		
* 2. (a) The conditions about filling a quiz are not met:
        1. The app does not let you submit the quiz.
		2. Save quiz option is presented so you can save the quiz and continue another time.
		
* 3. (a) Web failure of any sort during submission:
		1. Quiz current state is saved and can be submited in the resume a previously created quiz option
