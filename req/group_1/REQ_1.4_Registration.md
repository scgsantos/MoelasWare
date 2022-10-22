### User Case 1

Registration Requirements

### Primary Actor

User

### Scope 

User Goal

### Stakeholders and Interests

User - wants to be able to register a account

### Precondition

* No preconditions necessary
  
### Main Success Scenarios

1. User inserts a email
2. User inserts a password
3. User reconfirms the password
4. User clicks the "Submit" button
5. User leaves the registration page and goes to the login page

### Extensions

* 3. 	(a) User inserts a different password than the one inserted before and tries to click the "Submit" button
			1. User is show the error "Passwords do not match" without leaving the registration page and is able to change the password in order to match them

* 4.	(a) User tries to register with a already registered email and register/unregisterd password
			1. User is shown the error "Email already Registered" without leaving the registration page and is able to try again 	
		
		(b) User tries to click the "Submit" button without having inserted the email or password, or confirmation of password
			1. User is shown the error "Missing parameter"/"Missing parameters", the missing parameter/parameters, without leaving the registration page and is able to try again
		
