<template>
    <div>
        <div v-if="imagePath" class="questionImage">
            <img :src="imagePath" class="image" />
        </div>

        <div v-if="text" class="subtitle">
            <h3>({{ number }}/{{ count }}) {{ text }}</h3>
        </div>
        
        <pre>{{ imagePath }}</pre>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps([ 'number', 
                                'image', 
                                'text', 
                                'count', 
                                'gameId'])

    const imagePath = computed(() => props.image && props.gameId 
        ? `./quiz-assets/${props.gameId}/${props.image}` : null)
    console.log('question image path is', imagePath)

</script>

<style scoped>
    
</style>