<template>
    <div>
        <div v-if="questionImage" class="questionImage">
            <img :src="questionImage" />
        </div>
        <div v-if="questionText" class="questionText">
            <h3>({{ questionNumber }}/{{ questionCount }}) {{ questionText }}</h3>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
    defineProps(['questionNumber', 'questionImage', 'questionText', 'questionCount'])
</script>

<style scoped>
    
</style>