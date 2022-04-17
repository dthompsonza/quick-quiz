<template>
    <div v-if="isPlaying">
        <input class="answerInput" v-model="givenAnswer" :placeholder="placeHolder" :maxlength="maxInputLength" />
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, watchEffect } from 'vue'
    const emit = defineEmits(['win', 'lose'])
    const props = defineProps(['isPlaying', 'answer'])

    const givenAnswer = ref('')

    const placeHolder = computed(()=> {
        return "_".repeat(props.answer.length)
    })

    const maxInputLength = computed(()=> {
        return props.answer.length
    })

    watchEffect(() => {
        console.log('answer: ' + props.answer)
        console.log('given answer: ' + givenAnswer.value)
        if (props.answer == null || givenAnswer.value == null) {
            console.log('no answer or given answer to evaluate yet')
            return 
        }
        if (props.answer.length != givenAnswer.value.length) {
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