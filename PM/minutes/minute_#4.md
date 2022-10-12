# Meeting minute nº4 | Software Engineering | PL6

<div align="justify">

On the 1st of October 2022 at 6:30 PM, the fourth "MoelasWare" meeting was held online through Discord.

## DEBATED TOPICS

1. Creation of the requirements for later check-up with the client.

## DECISIONS MADE

1. The decision to arrange a meeting with the client was made.

2. In order to prevent miscommunication throughout the group we have decided to switch back all kinds of communication inside and outside class back to Portuguese (Nominating a translater for the Erasmus student).

3. The requirements created are as follow:
	- Submit a Quiz:
		* HTTP Request to POST a QUIZ
		* Parse QUIZ POST Request into a Python Object
		* Store Python Quiz Object in the Database

	- Review a Quiz:
		* HTTP Request to GET a QUIZ
		* Turn the Quizz in the DB into JSON
		* After the review, place back in the DB, and check if it was accepted or not

	- Solve a Test:
		* Generate a Test from various reviewed Quizzes	
		* Check whether answers are correct or not
		* See Solutions

	- History and Hall of Fame:
		* HTTP Request to GET all your TESTS
		* HTTP Request to GET all submissions of a particular TEST
		* HTTP Request to GET top test solvers

	- Design & Rendering:
		* Design the Front Page
		* Render a Quiz/Test (given the JSON)
		* Render History/Hall of Fame

## PARTICIPANTS

Representatives of each group were present at the meeting:

## Group 1

- [x] Nuno Gomes (PM)

## Group 2

- [x] João Leite (PM)

- [x] Tomás Duarte (D) 

## Group 3

- [x] João Pino (PM)

## Group 4

- [x] Pedro Ascensão (PM)

## Group 5

- [x] Miguel Santana (PM)

## DOCUMENT

Author: `Nuno Gomes`

Information gathering: `Nuno Gomes`

Revision: `João Leite`, `Pedro Ascensão`
