### User Case 1

Login Requirements

### Primary Actor

User

### Scope 

User Goal

### Stakeholders and Interests

User - wants to be able to login and use the available functionalities, if not able to log in it must be able to register

### Precondition

* Have a registered account
  
### Main Success Scenarios

1. User inserts email
2. User inserts password
3. User clicks "login" button
4. User successfully logs in

### Extensions 

* 3.	(a) User tries to login with registered email and registered password but they do not belong to the same account
			1. User is shown the error "Wrong Credentials" without leaving the login page
			2. User is able to retry the login
     	
		 (b) User tries to login with unregistered email and registered password
			1. User is shown the error "Wrong Credentials" without leaving the login page, it does not show the password belongs to another email
			2. User is able to retry the login or register with the unregistered email
                                              
		(c) User tries to login with unregistered email and unregistered password:
			1. User is shown the error "Wrong Credentials" without leaving the login page
			2. User is able to select the option to register with the unregistered email
			3. If selected, User leaves the login page and goes to registration page

		(d) User tries to login with registered email and but wrong password:
			1. User is shown the error "Wrong Credentials" without leaving the login page
			2. User is able to retry the login

		(e) User tries to click the "login" button without having insert any information
			1. User is shown the error "Missing parameters" without leaving the login page and is able to try again
		
		(f) User tries to click the "login" button without having inserted the email or password
			1. User is shown the error "Missing parameter", the parameter missing, without leaving the login page and is able to try again                                                                                                                                                                                                                                                                                              
