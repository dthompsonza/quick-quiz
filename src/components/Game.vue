<template>
    <div>
        <span class="title is-3"><center>{{ gameName }}</center></span>
        
    </div>

    <div class="box questionBlock" v-if="isPlaying && !gameOver && !questionOver">

        <Question 
            :questionText="questionText" 
            :questionImage="questionImage" 
            :questionNumber="questionNumber"
            :questionCount="questionCount"
            :gameId="gameId"
        />

        <Answer  
            :answer="answer"
            :hint="hint" 
            :questionNumber="questionNumber"
            :rules="gameRules"
            @round-over="handleAnswerResultCallback" 
        />
        
    </div>

    <div class="questionResultBlock" v-if="isPlaying && !gameOver && questionOver">
        <QuestionResult 
            :win="questionResults.winState" 
            :answer="questionResults.text" 
            @okay-clicked="closeQuestionResultAndTick" />
    </div>

    <div class="gameResultBlock" v-if="!isPlaying && gameOver">
        <GameResult 
            :gameOver="gameOver" 
            :gameResults="gameResults" 
        />
    </div>

    <div class="controls">
        <p align="center">
            <button class="button mx-1" @click="handleStartGame" :disabled="isPlaying">Start Game</button>
            <button class="button mx-1" @click="handleStopGame" :disabled="!isPlaying">Stop Game</button>
            <button class="button mx-1" @click="handleQuitGame" :disabled="isPlaying">Quit Game</button>
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'

    import Question from './Question.vue'
    import Answer from './Answer.vue'
    import GameResult from './GameResult.vue'
    import QuestionResult from './QuestionResult.vue'
    import Progress from './Progress.vue'

    const emit = defineEmits(['unloadGame'])
    const props = defineProps(['gameSetup'])
    const isPlaying = ref(false) //true: shows Question&Answer components
    const questionIndex = ref(-1)
    const questions = ref([])
    
    const gameRules = ref()
    const gameId = ref()
    const questionOver = ref(false)
    const questionResults = ref({
        winState: false,
        text: ''
    })
    const scoreboard = ref([])
    const gameOver = ref(false) //true: shows (Game) Result's component 
    const gameResults = ref({
        winState: false,
        text: '',
        scoreboard: []
    })
    const winCount = ref(0)
    const questionText = ref('')
    const questionImage = ref('')
    const answer = ref('')
    const hint = ref('')
    const questionNumber = ref(null)
   
    const gameName = computed(() => props.gameSetup.name)
    const questionCount = computed(() => questions.value.length)
    const progressMaxValue = computed(() => !isPlaying ? 0 : questions.value.length)
    const progressValue = computed(() => !isPlaying.value ? 0 : questionIndex.value + 1)

    //#region Button events

    function handleStartGame() {
        startGame()
    }

    function handleStopGame() {
        stopGame(true)
    }

    function handleQuitGame() {
        emit('unloadGame')
    }

    //#endregion

    //#region Component functions

    function startGame() {
        if (isPlaying.value) {
            console.log('game already in progres...')
            return
        }
        gameOver.value = false 
        if (!props.gameSetup) {
            console.error('there is no game setup data')
            return
        }
        gameRules.value = props.gameSetup.rules
        gameId.value = props.gameSetup.uniqueid
        questions.value = getGameQuestions(props.gameSetup)
        isPlaying.value = true
        gameTick()
    }

    function getGameQuestions(gameSetup) {
        var availableQuestions = gameSetup.questions.map(q => q.questionIndex)
        var selectedQuestions = []
        while (availableQuestions.length > 0) {
            var index = getRandomInt(0, availableQuestions.length)
            console.log('random index is ', index, availableQuestions[index], availableQuestions.length)
            selectedQuestions.push(availableQuestions[index])
            availableQuestions.splice(index, 1)
            if (selectedQuestions.length >= gameSetup.rules.questionsPerGame) {
                console.log('enough questions found for this round')
                break
            }
        }
        var questions = []
        for (var i = 0; i < selectedQuestions.length; i++) {
            var question = gameSetup.questions[selectedQuestions[i]]
            console.log(i, 'adding question ', selectedQuestions[i], question)
            questions.push(question)
        }
        return questions
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
            questionImage.value = questions.value[questionIndex.value].questionImage
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
        questionImage.value = ''
        answer.value = ''
        questionNumber.value = ''
        questionIndex.value = -1
        questions.value = []
        gameRules.value = null
        gameId.value = null
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
            text: text,
            scoreboard: scoreboard.value
        }
    }

    function addScore(questionNo, winResult, answer, givenAnswer) {
        var score = {
            questionNo: questionNo,
            answer: answer,
            givenAnswer: givenAnswer,
            result: winResult
        }
        scoreboard.value.push(score)
    }

    //#endregion

    //#region Callbacks 

    function handleAnswerResultCallback(roundOver) {
        console.log('round result event handled')
        addScore(roundOver.questionNo, roundOver.winState, roundOver.answer, roundOver.givenAnswer)
        questionResults.value.winState = roundOver.winState 
        questionResults.value.text = answer.value
        questionOver.value = true
        if (roundOver.winState) {
            winCount.value++
        }
    }

    function closeQuestionResultAndTick() {
        questionOver.value = false
        gameTick()
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
        min-height: 30px;
        padding: 5px;
        margin: 5px auto;
        background-color: #b1b1d8;
        border-radius: 10px;
    }
</style>