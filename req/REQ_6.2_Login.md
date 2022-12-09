# Use Case 2

* As user I want to compelte a login to access the website

##** Primary Actor **

* User.

##** Level **

* User goal.

##** Preconditions ** 

* Be Registered

##** Success Guarantee **

User can access the website and has a authentication token that identifies him

##** Happy Path **
* 1. The user inputs his email and password
* 2. The user enters login
* 3. The user receives a success confirmation message
* 4. The user enters the landing page and has a authentication token 

## Alternative Path
* 1.    (a) User tries to login with registered email but the introduced password doesn't match the registered password
            1. User is shown the error "Wrong Credentials" without leaving the login page
            2. User is able to retry the login
                                              
        (b) User tries to login with unregistered email and unregistered password:
            1. User is shown the error "Wrong Credentials" without leaving the login page
            2. User is able to select the option to register with the unregistered email
            3. If selected, User leaves the login page and goes to registration page

        (c) User tries to click the "login" button without having insert any information
            1. User is shown the error "Missing parameters" without leaving the login page and is able to try again
        
        (d) User tries to click the "login" button without having inserted either the email or the password
            1. User is shown the error "Missing parameter", the parameter missing, without leaving the login page and is able to try again              

##** Layouts**


(each requirement is identified on the Figma canvas)
