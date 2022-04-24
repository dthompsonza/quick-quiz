<template>
    <div>
        <button v-for="(char, index) in chars" class="answerCharacter" 
            @click="buttonPressed(char, index)"
            :class="{ pressed: buttonState[index] }">
                {{ formatDisplayChar(char) }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'

    const props = defineProps(['text', 'minLength'])
    const emit = defineEmits(['button'])
    const emptyChar = '\t'
    var buttonState = ref([])

    const chars = computed(() => {
                var p = props.text ?? ''
                if (props.minLength ?? 0 > 0) {
                    if (p.length < props.minLength) {
                        p = p.padStart(props.minLength, emptyChar)
                    }
                }
                
                return p;
            })

    function formatDisplayChar(char) {
        if (char === emptyChar) {
            return "."
        }
        return char 
    }

    function getState(index) {
        console.log('get button state ' + index)
        return buttonState.value[index]
    }

    function buttonPressed(char, index) {
        buttonState.value[index] = !buttonState.value[index]
        var zstate = zipState(props.text, buttonState)
        emit('button', char, zstate)
    }

    onMounted(() => {
            
            buttonState.value = new Array(props.text.length).fill(false)
            console.log('button state init', buttonState)
        })

    function zipState(text, state) {
        var zippedState = []
        for (var i = 0; i < text.length; i++) {
            if (state[i]) zippedState.push(i)
        }
        return zippedState
    }

    function unzipState(text, zstate) {
        var state = Array(text.length).fill(false)
        var zcounter = 0
        for (var i = 0; i < text.length; i ++) {
             if (zstate[zcounter] = i) {
                 state[i] = true
                 zcounter++
             }
        }
    }

</script>

<style scoped>
    .answerCharacter {
        margin: 5px;
        padding: 10px;
        min-width: 40px;
        height: 50px;
        border: 0;
        box-shadow: none;
        border-radius: 0px;
    }
</style>