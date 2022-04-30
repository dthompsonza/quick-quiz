
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

