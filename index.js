function Quiz(question){
    this.score = 0;
    this.questionIndex = 0;
    this.question = question;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.question.length;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.question[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

let question = [
    new Question("JavaScript Supports", ["Functions", "CSS", "XHTML", "HTML"], "Functions"),
    new Question("Which language is used for styling webpages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript framework?", ["Python Script", "Django", "JQuery", "NodeJS"], "Django"),
    new Question("Which is used for connecting to Database?", ["PHP", "HTML", "JavaScript", "All"], "PHP"),
    new Question("JavaScript is a", ["Language", "Programming language", "Development language", "All"], "Programming language")
];

function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    }
}

function loadQuestion(){
    if (quiz.isEnded()){
        showScores();
    }
    else{
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;
        var choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            var choice = document.getElementById("choice" + i);
            choice.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }

        updateProgress();
    }
    
}

function updateProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progress = document.getElementById("progress");
    progress.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.question.length;
}

function showScores() {
    var gameOverHtml = "<h1>Results</h1>";
    gameOverHtml += "<h2 id='score'>" + quiz.score + " correct answers out of " +question.length+ "<br>You've scored " + (quiz.score / question.length * 100) + "% </h2>"

    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}
let quiz = new Quiz(question);

loadQuestion();
