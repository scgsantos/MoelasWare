# Use case 1 

* Imports Quizzes with a .xml file

## **Primary actor **

* User

## **Level**

* User goal

## **Prerequisites**

* The user must be logged in.

## **Success Guarantee**

The user can import a xml file and add the Quizzes it contains

## ** Happy Path **

* 1. The User opens the "Create a Quiz" page
* 2. The User presses "Choose a File" and chooses a .xml file containing quizzes
* 3. The User presses "Import"
* 5. The Quizzes are added to the website.

## ** Alternative Path **


##**Case Tests**

###Test 1 – Select na xml file

** User **
* 1. Selects a file
* 2. Uploads the selected file

** System **
* 1. Checks if the file is a xml file
* 2. Checks if the .xml file structure is according to template

** OK/NOK **

###Test 2 – Quizzes already in the system
* 1. Selects a .xml file with correct structure according to template
* 2. Uploads the selected file

** System **
* Checks if the quizzes on the file are already on the system
* If they already exist, doesn't add the quizzes 


** OK/NOK **
