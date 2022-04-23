<template>
    <div v-if="isPlaying">
        <div class="answerLettersBlock">
            <ButtonPanel :characters="givenAnswer" :length="answerLength" />
        </div>
        <div class="answerPoolLettersBlock">
            <ButtonPanel :characters="alternativeAnswerChars" />
        </div>
        
        <div>
            <button @click="handleCheckAnswer">Check Answer</button>
            <button @click="showHint" :disabled="hintVisible" v-if="rules.allowHints">Hint</button>
        </div>
        <div v-if="hintVisible" class="hint">
            <p>{{ hint }}</p>
        </div>

        
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue'
    import ButtonPanel from './ButtonPanel.vue'

    const emit = defineEmits(['win', 'lose'])
    const props = defineProps(['rules','isPlaying', 'answer', 'hint', 'questionNumber'])
    const givenAnswer = ref('')
    const hintVisible = ref(false)

    const answerLength = computed(() => props.answer?.length ?? 0)
    const alternativeAnswerChars = computed(() => 
            buildAnswerButtonChars(props.rules.answerAlternatives, 
                props.rules.answerButtonsLimit,
                props.answer)
        )

    function buildAnswerButtonChars(alternativeChars, limit, answer) {
        if (alternativeChars.length < limit){
            console.log(`${alternativeChars} alternative chars list is too short to get ${limit} button limit`)
            return
        }
        var answerChars = answer
        var charPool = alternativeChars.split('')
        while(answerChars.length < limit && charPool.length > 0) {
            var r = Math.floor(Math.random() * charPool.length)
            var c = charPool[r]
            charPool.slice(r, 1)
            answerChars += c
        }

        return shuffleWord(answerChars)
    }

    function shuffleWord (word){
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }

    function addLetterToAnswer(char) {
        givenAnswer.value += char
    }

    function showHint() {
        hintVisible.value = true
    }

    function resetComponent() {
        hintVisible.value = false 
        givenAnswer.value = ''
    }

    watch(() => props.questionNumber, () => resetComponent())

    function handleCheckAnswer() {
        if (props.answer.length > 0 && givenAnswer.value.length > 0 && props.answer.length === givenAnswer.value.length) {
            verifyWin(props.answer, givenAnswer.value)
        }
    }

    function verifyWin(answer, givenAnswer) {
        if (answersMatch(answer, givenAnswer)) {
            emit('win')
            console.log("correct")
        } else {
            emit('lose')
            console.log("wrong")
        }
        return true
    }

    function answersMatch(answer, givenAnswer) {
        if (answer == null || givenAnswer == null) {
            return false
        }
        if (answer.length < 1 || givenAnswer.length < 1){
            return false
        }
        return answer.toUpperCase() === givenAnswer.toUpperCase();
    }
</script>

<style scoped>

    .answerBlock
    {
        background-color: #fff;
        letter-spacing: 2px;
        text-align: center;
        font-size: 54px;
        width: 50%;
        caret-color: transparent;
    }
</style>