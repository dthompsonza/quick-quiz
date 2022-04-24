// buttonState.js

export function packBtnState(text, pressedButtons, missingCharSubstitute) {
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

    var btnState = {
        pressedText: pressedText,
        pressedButtons: pressedButtons,
        text: text
    }
    return btnState
}

