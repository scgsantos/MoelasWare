## Use Case 1

* Register

##** Primary Actor **

* User.

##** Level **

* User goal.

##** Preconditions ** 

* None 

##** Success Guarantee **

The email and password are entered in the systems database

##** Happy Path **
- 1. The user inputs the email, password and a password confirmation
- 2. The user clicks "Register" and the data is kept
- 3. The user receives a success confirmation message

## Extensions

* 1.    (a) User inserts a different password than the one inserted before and tries to click the "Submit" button
            1. User is show the error "Passwords do not match" without leaving the registration page and is able to change the password in order to match them

* 2.    (a) User tries to register with a already registered email 
            1. User is shown the error "Email already Registered" without leaving the registration page and is able to try again
        
        (b) User tries to click the "Submit" button without having inserted the email, password or confirmation of password
            1. User is shown the error "Missing parameter"/"Missing parameters", the missing parameter/parameters, without leaving the registration page and is able to try again


##** Layouts **

(each requirement is identified on the Figma canvas)
