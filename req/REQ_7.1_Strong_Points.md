## Use Case 2

* Como <resolvedor> quero <ter no meu perfil o número de quizzes de uma dada categoria (tags) que acertei> para <saber quais os meus pontos fortes>


##** Primary Actor **

* User.

##** Level **

* User goal.

##** Preconditions ** 

* The user is logged in
* The user as solved 1+ tests


##** Success Guarantee **

The user can see on his profile the number of quizzes he has answered displayed by tags

##** Happy Path **
* 1. The user enters his profile page
* 2. The user can see a pie chart with the number of quizzes he answered with every tag 

## Alternative Path

* 1.    (a) The User hasn't completed any test
            1. The pie chart appears empty

##**Case Tests**

###Test 1 – Displays all tests

** User **
* 1. User opens Profile Page

** System **
* 1. Displays a pie chart tagged with all the tags used by the user
* 2. The pie chart has the right percentages of tests solved by tags   

** OK/NOK **



##** Layouts **


(each requirement is identified on the Figma canvas)
