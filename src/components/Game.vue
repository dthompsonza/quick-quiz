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
            :gameOver="gameOver" 
            :gameResults="gameResults" 
        />
    </div>
    <div class="controls">
        <button @click="startGame" v-if="!isPlaying">Start</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import Question from './Question.vue'
    import Answer from './Answer.vue'
    import Result from './Result.vue'

    const isPlaying = ref(false) //true: shows Question&Answer components
    const questionIndex = ref(-1)
    const questionData = ref([])
    const gameOver = ref(false) //true: shows Results component
    const gameResults = ref({
            winState: false,
            text: ''
        })
    const winCount = ref(0)
    const questionText = ref('')
    const questionImage = ref('')
    const answer = ref('')
    const hint = ref('')

    function startGame() {
        if (isPlaying.value) {
            console.log('game already in progres...')
            return
        }
        gameOver.value = false 
        questionData.value = gameSetup.data
        isPlaying.value = true
        gameTick()
    }
    
    function gameTick() {
        console.log('game tick')
        if (!isPlaying.value){
            return
        }
        if (questionIndex.value >= questionData.value.length) {
            isPlaying.value = false 
            gameResults.value = calculateWin()
            questionIndex.value = -1
            questionData.value = []
            gameOver.value = true
        }

        questionIndex.value++
        console.log('getting question #' + questionIndex.value)
        questionText.value = questionData.value[questionIndex.value].questionText
        answer.value = questionData.value[questionIndex.value].answer 
        hint.value = questionData.value[questionIndex.value].hint
    }

    function calculateWin() {
        let lossCount = questionData.value.length - winCount.value
        let winState = winCount.value > lossCount
        let text = winState ? `Well done you got ${winCount.value} correct` : `Aww you got ${lossCount} wrong`
        return { 
            winState: winState,
            text: text
        }
    }

    function winAnswerCallback() {
        console.log('win callback')
        winCount.value++
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