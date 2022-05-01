<template>
    <div>
        <progress class="progress" :value="value" :max="max">{{ value }}</progress>
    </div>
</template>

<script setup lang="ts">
    defineProps(['value', 'max'])
</script>

<style scoped>
</style>