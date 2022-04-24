<template>
    <div>
        <button v-for="(char, index) in displayChars" class="answerCharacter" 
            @click="buttonClicked(char, index)"
            :class="{ pressed: isPressed(index) }">
                {{ formatDisplayChar(char) }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import { packBtnState } from "../scripts/buttonState"

    const props = defineProps(['text', 'minLength', 'maxLength'])
    const emit = defineEmits(['buttonPressed', 'buttonUnpressed'])
    const emptyChar = '\t'
    var pressedButtons = ref([])

    const displayChars = computed(() => {
            var chars = props.text ?? ''
            if (props.minLength ?? 0 > 0) {
                if (chars.length < props.minLength) {
                    chars = chars.padEnd(props.minLength, emptyChar)
                }
            }
            return chars;
        })

    function formatDisplayChar(char) {
        if (char === emptyChar) {
            return "."
        }
        return char 
    }

    function buttonClicked(char, index) {
        if (isPressed(index)) {
            unpressButton(index)
            var pressedText = getPressedText(props.text, pressedButtons.value, emptyChar)
            emit('buttonUnpressed', char, pressedText)
        } else {
            pressButton(index)
            var pressedText = getPressedText(props.text, pressedButtons.value, emptyChar)
            emit('buttonPressed', char, pressedText)
        }
    }
    
    function getPressedText(text, pressedButtons, missingCharSubstitute) {
        if (pressedButtons.length > text.length) {
            console.error('cant have more pressed buttons than text')
        }
        var pressedText = ''
        for (var i = 0; i < pressedButtons.length; i++) {
            if (pressedButtons[i] < 0)
                pressedText += missingCharSubstitute
            else
                pressedText += text[pressedButtons[i]]
        }
        return pressedText
    }
    
    function pressButton(index) {
        if (isPressed(index)) {
            return
        }
        if (pressedButtons.value.length < (props?.minLength ?? props?.maxLength ?? 0)) {
            pressedButtons.value.push(-1)
        }
        var io = pressedButtons.value.indexOf(-1)
        if (io < 0) {
            console.log('cant press any more buttons')
            return 
        }
        pressedButtons.value[io] = index
    }

    function unpressButton(index) {
        if (!isPressed(index)) {
            return
        }
        var io = pressedButtons.value.indexOf(index)
        pressedButtons.value[io] = -1
    }

    function isPressed(index) {
        return pressedButtons.value.includes(index)
    }

    onMounted(() => pressedButtons.value = Array(props.minLength).fill(-1))

    function resetComponent() {
        pressedButtons.value = []
    }

    watch(() => props.text, () => resetComponent())

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

    .answerCharacter.pressed {
        background-color: goldenrod;
    }
</style>