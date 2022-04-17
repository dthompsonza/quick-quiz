<template>
    <div v-if="isPlaying">
        <div v-if="questionImage" class="questionImage">
            <img :src="questionImage" />
        </div>
        <div v-if="questionText" class="questionText">
            <h3>{{ questionText }}</h3>
        </div>
        <div v-if="hintVisible" class="hint">
            <p>{{ hint }}</p>
        </div>
        <button @click="showHint" v-if="!hintVisible">Hint</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    defineProps(['isPlaying', 'questionImage', 'questionText', 'hint'])

    const hintVisible = ref(false)

    function showHint() {
        hintVisible.value = true
    }

    
</script>

<style scoped>
    
</style>