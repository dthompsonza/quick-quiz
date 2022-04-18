<template>
    <div v-if="isPlaying">
        <div v-if="questionImage" class="questionImage">
            <img :src="questionImage" />
        </div>
        <div v-if="questionText" class="questionText">
            <h2>Question {{ questionNumber }}</h2>
            <br/>
            <h3>{{ questionText }}</h3>
        </div>
        
        
    </div>
</template>

<script setup lang="ts">
    defineProps(['isPlaying', 'questionNumber', 'questionImage', 'questionText'])
</script>

<style scoped>
    
</style>