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

    const inputWatcher = watchEffect(() => {
        if (verifyWin(props.answer, givenAnswer.value)) {
            //inputWatcher()
            //@stephan: my thinking here was to kill the watchEffect once the user "won", however the UI throws if i uncomment the above line
        }
    })

    function verifyWin(answer, givenAnswer) {
        if (answersMatch(answer, givenAnswer)) {
            
            emit('win')
            console.log("correct")
            return true;
        } else {
            
            emit('lose')
            console.log("wrong")
            return false;
        }
    }

    function answersMatch(answer, givenAnswer) {
        if (answer == null || givenAnswer == null) {
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