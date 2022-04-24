<template>
    <div class="questionBlock" v-if="isPlaying && !gameOver && !questionOver">
        <Question 
            :questionText="questionText" 
            :questionImage="questionImage" 
            :questionNumber="questionNumber"
        />
        <Answer  
            :answer="answer"
            :hint="hint" 
            :questionNumber="questionNumber"
            :rules="gameRules"
            @win="winAnswerCallback" 
            @lose="loseAnswerCallback"
        />
    </div>

    <div class="questionResultBlock" v-if="isPlaying && !gameOver && questionOver">
        <QuestionResult 
            :win="questionResults.winState" 
            :answer="questionResults.text" 
            @okay-clicked="questionResultOkayCallback" />
    </div>

    <div class="gameResultBlock" v-if="!isPlaying && gameOver">
        <Result 
            :gameOver="gameOver" 
            :gameResults="gameResults" 
        />
    </div>

    <div class="controls">
        <button @click="handleStartGame" :disabled="isPlaying">Start Game</button>
        <button @click="handleStopGame" :disabled="!isPlaying">Quit Game</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import Question from './Question.vue'
    import Answer from './Answer.vue'
    import Result from './Result.vue'
    import QuestionResult from './QuestionResult.vue'

    const isPlaying = ref(false) //true: shows Question&Answer components
    const questionIndex = ref(-1)
    const questions = ref([])
    const gameRules = ref()
    const questionOver = ref(false)
    const questionResults = ref({
        winState: false,
        text: ''
    })
    const gameOver = ref(false) //true: shows (Game) Result's component 
    const gameResults = ref({
        winState: false,
        text: ''
    })
    const winCount = ref(0)
    const questionText = ref('')
    const questionImage = ref('')
    const answer = ref('')
    const hint = ref('')
    const questionNumber = ref(null)
   
    //#region Button events

    function handleStartGame() {
        startGame()
    }

    function handleStopGame() {
        stopGame(true)
    }

    //#endregion

    //#region Component functions

    function startGame() {
        if (isPlaying.value) {
            console.log('game already in progres...')
            return
        }
        gameOver.value = false 
        gameRules.value = parseSetupGameRules(gameSetup.rules)
        questions.value = gameSetup.questions
        isPlaying.value = true
        gameTick()
    }
    
    function gameTick() {
        console.log('game tick')
        if (!isPlaying.value){
            return
        }
        // Check if we've gone through all the questions
        if (questionIndex.value >= questions.value.length - 1) {
            stopGame()
            return
        }
        // Move to the next question
        advanceToNextQuestion()
    }

    function advanceToNextQuestion() {
        if (questionIndex.value < questions.value.length - 1) {
            questionIndex.value++
            console.log('getting question #' + questionIndex.value)
            questionText.value = questions.value[questionIndex.value].questionText
            answer.value = questions.value[questionIndex.value].answer 
            hint.value = questions.value[questionIndex.value].hint
            questionNumber.value = questionIndex.value + 1
        }
    }

    function stopGame(isCancelled = false) {
        console.log('game over')
        var gameOverResults = calculateGameResults()
        isPlaying.value = false 
        questionText.value = ''
        answer.value = ''
        questionNumber.value = ''
        questionIndex.value = -1
        questions.value = []
        if (isCancelled) {
            return
        }
        gameResults.value = gameOverResults
        gameOver.value = true
    }

    function calculateGameResults() {
        var lossCount = questions.value.length - winCount.value
        var winState = winCount.value > lossCount
        var text = winState ? `Well done you got ${winCount.value} correct` : `Aww you got ${lossCount} wrong`
        console.log(winState, text)

        return { 
            winState: winState,
            text: text
        }
    }

    // Sanitizes the game rules from setup to conform to what the game expects
    function parseSetupGameRules(setupGameRules) {
        var rules = {
            allowHints: setupGameRules.allowHints ?? true,
            questionsPerGame: setupGameRules.questionsPerGame ?? 10,
            answerButtonsLimit: setupGameRules.answerButtonLimit ?? 20,
            answerAlternatives: setupGameRules.answerAlternatives ?? "AABCDEEFGHIIJKLMNOOPQRSTUUVWXYYZ"
        }

        return rules
    }

    //#endregion

    //#region Callbacks 

    function winAnswerCallback() {
        console.log('win callback')
        questionResults.value.winState = true 
        questionResults.value.text = answer.value
        questionOver.value = true
        winCount.value++
    }

    function loseAnswerCallback() {
        console.log('lose callback')
        questionResults.value.winState = false 
        questionResults.value.text = answer.value
        questionOver.value = true
    }

    function questionResultOkayCallback() {
        questionOver.value = false
        gameTick()
    }
    
    //#endregion 

    //#region Other

    let gameSetup = {
        rules : {
            allowHints: false,
            questionsPerGame: 3,
            answerButtonLimit: 8,
            answerAlternatives: null
        },
        questions : [
            {
                questionImage: null,
                questionText: "What goes meow?",
                answer: "CAT",
                hint: "Its not a dog"
            },
            {
                questionImage: null,
                questionText: "What goes woof?",
                answer: "DOG",
                hint: "Its not a cat"
            },
            {
                questionImage: null,
                questionText: "What animal with feathers can fly?",
                answer: "BIRD",
                hint: "Chirp chirp"
            },
            {
                questionImage: null,
                questionText: "Black and white sea bird?",
                answer: "PENGUIN",
                hint: "Starts with a P"
            },
            {
                questionImage: null,
                questionText: "What shape is round?",
                answer: "CIRCLE",
                hint: "Like a hula-hoop"
            },
            {
                questionImage: null,
                questionText: "What does a chicken lay?",
                answer: "EGG",
                hint: "Yummy for breakfast"
            },
            {
                questionImage: null,
                questionText: "Mix Blue and Yellow?",
                answer: "GREEN",
                hint: "The colour of leaves"
            },
            {
                questionImage: null,
                questionText: "What color is snow?",
                answer: "WHITE",
                hint: null
            },
            {
                questionImage: null,
                questionText: "This is hard?",
                answer: "WOOD",
                hint: "Its made from trees"
            },
            {
                questionImage: null,
                questionText: "Green is the answer?",
                answer: "GREEN",
                hint: "Just type green"
            },
        ]
    }

    //#endregion

</script>
    
<style scoped>
    .questionBlock {
        width: 80%;
        min-height: 100px;
        padding: 20px;
        margin: 30px auto;
        background-color: #7db1ff;
        border-radius: 10px;
    }

    .questionResultBlock {
        width: 80%;
        min-height: 100px;
        padding: 20px;
        margin: 30px auto;
        background-color: #ad11ff;
        border-radius: 10px;
    }

    .gameResultBlock {
        width: 80%;
        min-height: 100px;
        padding: 20px;
        margin: 30px auto;
        background-color: #0db1ff;
        border-radius: 10px;
    }

    .controls {
        width: 70%;
        min-height: 50px;
        padding: 20px;
        margin: 30px auto;
        background-color: #b1b1d8;
        border-radius: 10px;
    }
</style>