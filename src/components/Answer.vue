<template>
    <div v-if="isPlaying">
        <input class="answerInput" v-model="givenAnswer" :placeholder="placeHolder" :maxlength="maxInputLength" />
        <div v-if="hintVisible" class="hint">
            <p>{{ hint }}</p>
        </div>
        <div>
            <button @click="showHint" :disabled="hintVisible">Hint</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watchEffect, watch } from 'vue'

    const emit = defineEmits(['win', 'lose'])
    const props = defineProps(['isPlaying', 'answer', 'hint', 'questionNumber'])
    const givenAnswer = ref('')
    const hintVisible = ref(false)

    const placeHolder = computed(() => {
        return "_".repeat(props.answer.length)
    })

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

    watchEffect(() => {
        console.log('answer: ' + props.answer)
        console.log('given answer: ' + givenAnswer.value)
        if (props.answer == null || givenAnswer.value == null) {
            console.log('no answer or given answer to evaluate yet')
            return 
        }
        if (props.answer.length != givenAnswer.value.length || props.answer.length < 1 || givenAnswer.value.length < 1) {
            console.log('answer not long enough')
            return
        }
        
        if (verifyWin(props.answer, givenAnswer.value)) {
            givenAnswer.value = ''
        }
    })

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
    }
</style>