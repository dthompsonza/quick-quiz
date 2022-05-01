<template>
    <div>
        <div v-if="questionImagePath" class="questionImage">
            <img :src="questionImagePath" class="image" />
        </div>

        <div v-if="questionText" class="subtitle">
            <h3>({{ questionNumber }}/{{ questionCount }}) {{ questionText }}</h3>
        </div>
        
        <p>{{ questionImagePath }}</p>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps(['questionNumber', 'questionImage', 'questionText', 'questionCount', 'gameId'])

    const questionImagePath = computed(() => props.questionImage && props.gameId 
        ? `./quiz-assets/${props.gameId}/${props.questionImage}` : null)
    console.log('question image path is', questionImagePath)
    

</script>

<style scoped>
    
</style>