<template>
    <div>
        <button v-for="char in chars" class="answerCharacter">{{ char }}</button>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps(['characters', 'length'])

    const chars = computed(() => {
                var p = props.characters ?? ''
                if (props.length ?? 0 > 0) {
                    if (p.length < props.length) {
                        p = p.padStart(props.length)
                    }
                }
                
                return p;
            })
</script>

<style scoped>
    .answerCharacter {
        margin: 5px;
        padding: 10px;
        min-width: 20px;
    }
</style>