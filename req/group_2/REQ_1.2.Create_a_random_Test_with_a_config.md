## Use Case 2 - Randomly create a test with a config.

### Primary Actor
User

### Level
User goal

### Precondition 
- Must have an account with at least 3 reviews.
- Must have at least N quizzes in the database, where N is the number of specified quizzes in the Config.

### Success Guarantee
The Test is created according to the given Config; 

### Main Success Scenario
1. The User selects the option to create a test with a Configuration.
2. The User specifies the number of quizzes in the test.
3. The User specifies the tags allowed in the test.
4. The Backend selects randomly N unique quizzes.
5. The selected quizzes have at least one tag belonging to the allowed tags.
6. A Test is randomly generated according to the supplied Configuration.
7. The User is shown the test he created.

### Extensions

4a. The Backend fails to select the required quizzes...
   - 4a1. Because there just aren't enough quizzes in the Database.
      - It suggests selecting a lower number of quizzes.
   - 4a2. Because there aren't enough quizzes after filtering by tags.
      - It suggests choosing different tags.
