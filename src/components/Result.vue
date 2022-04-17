<template>
    <div v-if="gameOver">
        <div v-if="gameResults.winState">
            Correct
        </div>
        <div v-else>
            Sorry, you lost
        </div>
        <p>{{ gameResults.text }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(['gameOver', 'gameResults'])

</script>

<style scoped>

</style>