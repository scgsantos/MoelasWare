## Use Case 3
Create a test by picking the quizzes.

### Primary Actor
User.

### Level
User goal.

### Precondition 
* User must be logged in.
* User must have reviewed at least 3 quizzes.

### Success Guarantee
A test is created with the selected quizzes and a name.

### Main Success Scenario
1. The user chooses the option to create a test by picking the quizzes.
2. The user gets a list of all available quizzes, optionally filtered by tags.
3. The user selects which quizzes to include in the test.
4. The user gives the test a name.
5. The user submits the test.
6. The test is shown to the user.

### Extensions
2a. There are no valid questions to be chosen for the selected tags:
   - 2a1. The system shows a message suggesting other tags.
5a. Web failure of any sort during submission:
   - 5b1. The system shows a message saying web failure, try again and the user go back to "Create a test by picking the quizzes".

# Layouts
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)
