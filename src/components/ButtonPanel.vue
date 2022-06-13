<template>
    <div class="component-style" :class="componentClass">
        <div>
            <button v-for="(char, index) in displayChars"
                :class="[buttonClass, { pressed: isPressed(index) }]" 
                class="answer-character"
                @click="buttonPressed(char, index)"
            > 
                    {{ formatDisplayChar(char) }}

                    
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
//:class="buttonsClass"
    import { ref, computed, onMounted, watch } from 'vue'

    const props = defineProps(['name', 'text', 'minLength', 'maxLength', 'toggleWipePressed', 'canPress', 'buttonClass'])
    const emit = defineEmits(['buttonPressed', 'buttonUnpressed'])
    const emptyChar = '\t'
    var pressedButtons = ref([])

    const componentClass = computed(() => props.name ? `qq-buttonpanel-${props.name.toLowerCase()}` : null)
    const buttonClass = computed(() => props.buttonClass == null ? '' : props.buttonClass)
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
            return "_"
        }
        return char 
    }

    function buttonPressed(char, index) {
        if (!props.canPress) {
            return
        }
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
        // We limit how many buttons can be "pressed" by controlling the size of the `pressedButtons[]` collection
        if (pressedButtons.value.length < (props?.minLength ?? props?.maxLength ?? props.text.length)) {
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
    watch(() => props.toggleWipePressed, () => resetComponent())

</script>

<style scoped>
    .component-style {
        padding: 10px;
        margin: 5px auto;
        display: inline-block;
       /* white-space: nowrap;*/
    }

    .answer-character {
        margin: 5px;
        padding: 10px;
        min-width: 40px;
        height: 50px;
        border: 0;
        box-shadow: none;
        border-radius: 0px;
    }

    .answer-character.pressed {
        background-color: goldenrod !important; 
        background: inherit;
    }
</style>