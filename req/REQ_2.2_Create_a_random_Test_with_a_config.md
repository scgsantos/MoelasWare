# Use Case 2 

* Create a random test with a config.

##** Primary Actor **

* User.

##** Level **

* User goal.

##** Preconditions ** 
* User must be logged in.
* User must have reviewed at least 3 quizzes.
* The system must have at least N quizzes, where N is the number chosen by the user (minimum 4 quizzes).

##** Success Guarantee **
* A test is created according to the given config and a name.

##** Happy Path **
1. The user chooses the option to create a random test with a config.
2. The user writes the number of quizzes he wants to have in the test.
3. The user gets a list of all available tags.
4. The user selects the tags allowed in the test.
5. The user gives the test a name.
6. The user submits the test.
7. The test is shown to the user.

## Alternative Path

* 6.    (a) The system fails selecting the quizzes because there aren't enough quizzes:
            1. The system shows a message suggesting a lower number of quizzes and the user go back to "Create a random test with a config" page.
        
        (b) The system fails selecting the quizzes because there aren't enough quizzes after filtering by tags
            1.The system shows a message suggesting different tags and the user go back to "Create a random test with a config" page.
        (c) Web failure of any sort during submission:
            1. The system shows a message saying web failure, try again and the user go back to "Create a random test with a config".
              
                           
# Layouts
https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)
