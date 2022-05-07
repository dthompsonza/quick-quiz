
/*
    sanitizer.js

    ensures objects contain expected properties with default data for those properties
    that need to be defined.
    for properties where data absolutely needs to be provided from external data source
    we will catch missing data with gameDataValidator.js' validate() and prevent
    incomplete/malformed/missing game data from being playable by the user.
*/

export function sanitizeGameData(uncleanGameData) {
    var gameData = {
        name: uncleanGameData.name,
        uniqueid: uncleanGameData.uniqueid,
        enabled: uncleanGameData.enabled,
        rules: sanitizeRules(uncleanGameData.rules),
        questions: sanitizeQuestions(uncleanGameData.questions)
    }
    return gameData
}

function sanitizeRules(setupGameRules) {
    var rules = {
        allowHints: setupGameRules?.allowHints ?? true,
        questionsPerGame: setupGameRules?.questionsPerGame ?? 10,
        answerButtonsLimit: setupGameRules?.answerButtonLimit ?? 20,
        answerAlternatives: setupGameRules?.answerAlternatives ?? "AABCDEEFGHIIJKLMNOOPQRSTUUVWXYYZ"
    }

    return rules
}

function sanitizeQuestions(uncleanQuestions) {
    var questions = []
    var index = 0
    for (const uq of uncleanQuestions) {
        var question = {
            questionIndex: index++,
            questionImage: uq.questionImage,
            questionText: uq.questionText,
            answer: uq.answer,
            hint: uq.hint 
        }
        questions.push(question)
    }
    return questions 
}

