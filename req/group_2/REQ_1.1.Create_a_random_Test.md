## Use Case 1
Create a test randomly.

### Primary Actor
User.

### Level
User goal.

### Precondition
- User must have an account created and be logged in.
- User must have reviewed 3 quizzes.
- The database must have at least the number of quizzes that the user selected.

### Success Guarantee
A test is created with random quizzes in which the number is chosen by user (minimum 4 quizzes).

### Main Success Scenario
1. User selects to create a test randomly.
2. User selects how many quizzes he wants to have in the test (minimum 4).
3. A test is created with quizzes chosen randomly from the database (random tags).

### Extensions

2a. The Backend fails when selecting the quizzes:
- 2a1. There just aren't enough quizzes in the Database.
