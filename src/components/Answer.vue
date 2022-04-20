<template>
    <div v-if="isPlaying">
        <input ref="inputTextbox" class="answerInput" v-model="givenAnswer" :maxlength="maxInputLength" />
         <div>
            <button @click="handleCheckAnswer" :disabled="!inputLengthIsValid">Check Answer</button>
            <button @click="showHint" :disabled="hintVisible">Hint</button>
        </div>
        <div v-if="hintVisible" class="hint">
            <p>{{ hint }}</p>
        </div>
       
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watch, onMounted } from 'vue'

    const ValidCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    const emit = defineEmits(['win', 'lose'])
    const props = defineProps(['isPlaying', 'answer', 'hint', 'questionNumber'])
    const givenAnswer = ref('')
    const hintVisible = ref(false)
    const inputTextbox = ref()

    const inputLengthIsValid = computed(() => {
        return props.answer.length === givenAnswer.value.length
    })

    onMounted(() => 
        window.addEventListener("keypress", function(e) {
            console.log(e)
            AppendTextToAnswer(String.fromCharCode(e.keyCode))
        }.bind(this)))

    onMounted(() => 
        window.addEventListener("keydown", function(e) {
            console.log(e)
            if (['Backspace', 'Delete'].includes(e.key)) {
                RemoveLastCharFromAnswer()
            }
            if (['Enter'].includes(e.key)) {
                handleCheckAnswer()
            }
        }.bind(this)))

    onMounted(() => inputTextbox.value.focus)

    function AppendTextToAnswer(char){
        if (!props.isPlaying || !ValidCharacters.includes(char)) {
            return
        }

        if (givenAnswer.value.length < props.answer.length) {
            givenAnswer.value += char.toUpperCase()
        }
    }

    function RemoveLastCharFromAnswer() {
        if (!props.isPlaying) {
            return
        }

        if (givenAnswer.value.length > 0) {
            givenAnswer.value = givenAnswer.value.slice(0, -1)
        }
    }
    
    const maxInputLength = computed(() => {
        return props.answer.length
    })

    function showHint() {
        hintVisible.value = true
    }

    function hideHint() {
        hintVisible.value = false 
    }

    watch(() => props.questionNumber, (f,s) => hideHint())

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

    .answerInput
    {
        letter-spacing: 2px;
        text-align: center;
        font-size: 54px;
        width: 50%;
        caret-color: transparent;
    }
</style>