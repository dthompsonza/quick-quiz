<template>
    <div v-if="gameOver">
        <div v-if="winState">
            Correct
        </div>
        <div v-else>
            Sorry, you lost
        </div>
        <p>{{ text }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(['gameOver', 'winState', 'text'])

</script>

<style scoped>

</style>