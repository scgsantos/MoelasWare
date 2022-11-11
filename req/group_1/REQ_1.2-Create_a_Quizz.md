## Use Case 2

Finish a rejected or unfinished quiz

## Layouts

https://www.figma.com/file/5G5kJ171fKhsf2PJOusZer/MoelasWare?node-id=0%3A1

(each requirement is identified on the Figma canvas)

### Primary Actor

User

### Level

User goal

### Precondition 

* User must be logged in.
* Quiz created by the user was rejected or is unfinished

### Success Guarantee

* User submits the quiz for revision

### Main Success Scenario

1. User selects the option to finish a quiz
2. User gets a form like page that was previously completed by the user, where they can apply the necessary changes
3. User receives a notification which says that the quiz was submited for review


### Extensions

* 1. (a) Web failure of any sort during submission:
		1. Quiz current state is saved and can be submited in the resume a previously created quiz option
