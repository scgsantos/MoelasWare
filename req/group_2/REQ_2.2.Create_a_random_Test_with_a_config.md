## Use Case 2
Create a random test with a config.

### Primary Actor
User.

### Level
User goal.

### Precondition 
* User must be logged in.
* User must have reviewed at least 3 quizzes.
* The system must have at least N quizzes, where N is the number chosen by the user (minimum 4 quizzes).

### Success Guarantee
A test is created according to the given config and a name.

### Main Success Scenario
1. The user chooses the option to create a random test with a config.
2. The user writes the number of quizzes he wants to have in the test.
3. The user gets a list of all available tags.
4. The user selects the tags allowed in the test.
5. The user gives the test a name.
6. The user submits the test.
7. The test is shown to the user.

### Extensions
6a. The system fails selecting the quizzes because there aren't enough quizzes:
   - 6a1. The system shows a message suggesting a lower number of quizzes and the user go back to "Create a random test with a config" page.
6b. The system fails selecting the quizzes because there aren't enough quizzes after filtering by tags:
   - 6b1. The system shows a message suggesting different tags and the user go back to "Create a random test with a config" page.
6c. Web failure of any sort during submission:
   - 6c1. The system shows a message saying web failure, try again and the user go back to "Create a random test with a config".
