<template>
    <div class="gameBlock">
        <Question :isPlaying="isPlaying" 
            :questionText="questionText" 
            :questionImage="questionImage" 
            :hint="hint" 
        />
        <Answer  
            :isPlaying="isPlaying" 
            :answer="answer" 
            @win="winAnswerCallback" 
            @lose="loseAnswerCallback"
        />
        <Result 
            :gameOver="state.gameOver" 
            :winState="state.gameResults.winState" 
            :text="state.gameResults.text" 
        />
    </div>
    <div class="controls">
        <button @click="startGame" v-if="!isPlaying">Start</button>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import Question from './Question.vue'
    import Answer from './Answer.vue'
    import Result from './Result.vue'
    const emit = defineEmits(['event-win', 'event-lose'])

    const state = reactive({
        questionIndex: -1,
        questionData: [],
        gameOver: false,
        winCount: 0,
        gameResults: {
            winState: false,
            text: ''
        }
    })

    const isPlaying = ref(false)
    const questionText = ref('')
    const questionImage = ref('')
    const answer = ref('')
    const hint = ref('')

    function startGame() {
        if (isPlaying.value) return
        state.gameOver = false 
        state.questionIndex = 0
        state.questionData = gameSetup.data
        isPlaying.value = true
        console.log(state)
        gameTick()
        console.log(state)
    }
    
    function gameTick() {
        console.log('gametick')
        if (state.questionIndex >= state.questionData.length) {
            isPlaying.value = false 
            state.gameResults = calculateWin()
            state.questionIndex = -1
            state.questionData = []
            state.gameOver = true
        }

        state.questionIndex++
        questionText.value = state.questionData[state.questionIndex].questionText
        answer.value = state.questionData[state.questionIndex].answer 
        hint.value = state.questionData[state.questionIndex].hint
    }

    function calculateWin() {
        let lossCount = state.questionData.length - state.winCount
        let winState = state.winCount > lossCount
        let text = winState ? `Well done you got ${state.winCount} correct` : `Aww you got ${lossCount} wrong`
        return { 
            winState: winState,
            text: text
        }
    }

    function winAnswerCallback() {
        console.log('win callback')
        state.winCount++
        gameTick()
    }

    function loseAnswerCallback() {
        console.log('lose callback')
        gameTick()
    }
    
    let gameSetup = {
        rules : {
            allowHint: true
        },
        data : [
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


</script>
    
<style scoped>
    .gameBlock {
        width: 500px;
        min-height: 100px;
        padding: 20px;
        margin: 100px auto;
        background-color: #9adee0;
        border-radius: 10px;
    }
    .controls {
        width: 500px;
        min-height: 50px;
        padding: 20px;
        margin: 100px auto;
        background-color: #b1b1d8;
        border-radius: 10px;
    }
</style>