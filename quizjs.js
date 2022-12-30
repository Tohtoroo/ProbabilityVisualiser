const quizData = [
    {
        question: "What is probability",
        a: "The likelihood of an event occurring",
        b: "Placeholder",
        c: "Placeholder",
        d: "Placeholder",
        correct: "a",
    },
    {
        question: "Which of the following is not a discrete distribution?",
        a: "Binomial",
        b: "Normal",
        c: "Bernoulli",
        d: "Geometric",
        correct: "b",
    },
    {
        question: "Placeholder",
        a: "Placeholder",
        b: "Placeholder",
        c: "Placeholder",
        d: "Placeholder",
        correct: "b",
    },
    {
        question: "Placeholder",
        a: "Placeholder",
        b: "Placeholder",
        c: "Placeholder",
        d: "Placeholder",
        correct: "b",
    },

];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {

    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    
        let answer;
    
        answerEls.forEach((answerEl) => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });
    
        return answer;
    }

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = 
            `<h2 class = "question">You answered ${score}/${quizData.length} questions correctly.</h2>
            <button class = "quiz_btn" onclick="location.reload()">Reload</button>`;
        }
    }
});