## Use Case 1
Create a random test.

### Primary Actor
User.

### Level
User goal.

### Precondition
* User must be logged in.
* User must have reviewed at least 3 quizzes.
* The system must have at least N quizzes, where N is the number chosen by the user (minimum 4 quizzes).

### Success Guarantee
A test is created with random quizzes and a name.

### Main Success Scenario
1. The user chooses the option to create a random test.
2. The user writes the number of quizzes he wants to have in the test.
3. The user gives the test a name.
4. The user submits the test.
5. The test is shown to the user.

### Extensions
4a. The system fails selecting the quizzes because there aren't enough quizzes:
   - 4a1. The system shows a message suggesting a lower number of quizzes and the user go back to "Create a random test" page.
4b. Web failure of any sort during submission:
   - 4b1. The system shows a message saying web failure, try again and the user go back to "Create a random test".

# Layouts
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)
