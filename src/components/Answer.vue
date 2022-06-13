<template>
    <div>
        <center>
            <div>
                <ButtonPanel 
                    name="givenAnswer"
                    :text="givenAnswer" 
                    :minLength="answerLength"
                    buttonsClass="given-answer-block" 
                />
            </div>
            
            <div class="answer-pool-block">
                <ButtonPanel 
                    name="answerPool"
                    :text="alternativeAnswerChars" 
                    :maxLength="answerLength"
                    :canPress="true"
                    :toggleWipePressed="toggleAnswerPoolPressedButtons"
                    @button-pressed="answerPoolButtonCallback"
                    @button-unpressed="answerPoolButtonCallback" 
                    buttonClass="key__button"
                />
            </div>
            
            <div>
                <button class="button mx-1" @click="handleCheckAnswer">Send</button>
                <button class="button mx-1" @click="handleClearAnswer">Clear</button>
                <button class="button mx-1" 
                    @click="showHint" 
                    :disabled="hintVisible" 
                    v-if="rules.allowHints">Hint
                </button>
            </div>
            
            <div v-if="hintVisible" class="hint">
                <p>{{ hint }}</p>
            </div>
        </center>
    </div>
        
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue'
    import { set } from '@vueuse/core'
    import ButtonPanel from './ButtonPanel.vue'

    const emit = defineEmits(['roundOver'])
    const props = defineProps(['rules', 'answer', 'hint', 'questionNumber'])
    const givenAnswer = ref('')
    const hintVisible = ref(false)
    const toggleAnswerPoolPressedButtons = ref(0)
    const answerLength = computed(() => props.answer?.length ?? 0)
    const alternativeAnswerChars = computed(() => 
            buildAnswerButtonChars(props.rules?.answerAlternatives, 
                props.rules.answerButtonsLimit,
                props.answer)
        )

    function buildAnswerButtonChars(alternativeChars, limit, answer) {
        if (answer == null || alternativeChars == null) {
            return
        }
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

    function answerPoolButtonCallback(char, pressedText) {
        console.log('selected text is - ' + pressedText)
        set(givenAnswer, pressedText) 
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

    function handleClearAnswer() {
        toggleAnswerPoolPressedButtons.value++ // watch on the buttonpanel will clear the pressed buttons
        givenAnswer.value = ''
    }

    function verifyWin(answer, givenAnswer) {
        if (answersMatch(answer, givenAnswer)) {
            emit('roundOver', {
                questionNo: props.questionNumber,
                winState: true,
                answer: answer,
                givenAnswer: givenAnswer
            })
            console.log("correct")
        } else {
            emit('roundOver', {
                questionNo: props.questionNumber,
                winState: false,
                answer: answer,
                givenAnswer: givenAnswer
            })
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

    
</style>