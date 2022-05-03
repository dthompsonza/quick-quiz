<template>
    <div>
        <GameResultTable :scoreboard="gameResults.scoreboard"/>
        <h2>{{ gameResultTitle }}</h2>
        <p>{{ gameResults.text }}</p>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import GameResultTable from './GameResultTable.vue';

    const props = defineProps(['gameOver', 'gameResults'])
    const gameResultTitle = computed(() => props.gameResults.winState ? "Winner" : "Aww You Lost")
</script>

<style scoped>

</style>