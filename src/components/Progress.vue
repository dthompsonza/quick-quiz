<template>
    <div>
        <progress class="progress" :value="value" :max="max">15%</progress>
    </div>
</template>

<script setup lang="ts">

    defineProps(['value', 'max'])

</script>

<style scoped>

</style>