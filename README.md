# Words & Numbers Game

A really simple little web app to let kids run through preset tests where the game player
needs is given a series of questions or challenges and needs to type out an answer.

If the player is linked to a school/club then you and their teacher would be able to gauge
their abilities as compared to their peers. 

A useful tool that is both fun and insightful for educators and parents alike.

Visit the current running build to demo: https://dthompsonza.github.io/word-game/

More coming....

@dthompsonza

## To Do

1. Quit Button - ~~Make it work~~
2. Fix game flow
  * user should type full word and then a "Check Answer" button is enabled
  * if the user is correct, flash green else flash red (flash can be on the next question and transition to the regular _gameBlock_ background color)
  * per question record:
    1. given answer
    2. win/lose
    3. TTAQ (time to answer question aka click Check Answer)
    4. user (future)
3. Add "Give Up" button to automatically get the answer wrong with no answer recorded
4. On the Results block, show the list of questions, correct answer, given answer and a ❌ or ✔ to indicate lose or win
5. Get some words and numbers games together. 3 of each with 10 questions apiece, so 3 "words" games with 10 questions each and 3 "numbers" games also with 10 questions each, so 60 questions total
6. Figure out how to wire up the game to the game data
7. Get some better styling
8. Add users 

### 6. Add users

Let the user signup with an email address, magic link to login to the app
Also capture CLASS_CODE, a string that links that email to a school class or club or whatever entity the user is a part of
Capture the users name
