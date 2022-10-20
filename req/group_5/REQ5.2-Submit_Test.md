# INITIAL CONDITIONS
* Is logged in
* Has at least one test in the database
* Can view the questions from the database 

# SUBMIT
* Check the test submission after being answered (we may implement a MUST_ANSWER_ALL_QUESTIONS feature to obligate the users to answer to all questions before submit)
* Generate request to DB of the solution associated to the answered test (GET)
* Compare the answers with the DB solutions
* Calculate and atribute a grade (POST)
* After answer to the full test, present the correct answers in a different page


# FINAL STATE
* The test is submitted to the database
* Remove the solved test from the list of the user's recommended tests (in the future, the user will have the possibility of solve the test again)
* User is redirected to the home page
* User is atributed a score for the test
