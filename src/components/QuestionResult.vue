<template>
    <div>
        <h1>{{ headerText }}</h1>
        <p>{{ userText }}</p>
        <ButtonPanel :text="$props.answer"/>
        <button @click="handleOkayClick">Okay</button>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import ButtonPanel from './ButtonPanel.vue'
    
    const props = defineProps(['win', 'answer'])
    const emit = defineEmits(['okayClicked'])

    const headerText = computed(() => props.win ? "Correct" : "Wrong")
    const userText = computed(() => props.win ? 'Well done you got it right' : 'Sorry you didn\' get it right')

    function handleOkayClick() {
        emit('okayClicked')
    }
</script>

<style scoped>

</style>