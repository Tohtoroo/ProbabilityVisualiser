const quizLength = 4;

const quizData = [
    {
        question: "What is probability?",
        a: "The likelihood of an event occurring",
        b: "The study of numerical data",
        c: "The set of all possible outcomes of an experiment",
        d: "The outcome of an experiment",
        correct: "a",
    },
    {
        question: "Which of the following is not a discrete distribution?",
        a: "Binomial distribution",
        b: "Normal distribution",
        c: "Bernoulli distribution",
        d: "Geometric distribution",
        correct: "b",
    },
    {
        question: "Which of the following is not a continuous distribution?",
        a: "Normal distribution",
        b: "Chi-Squared distribution",
        c: "Poisson distribution",
        d: "Exponential distribution",
        correct: "c",
    },
    {
        question: "Which distribution is the Bernoulli distribution a special case of?",
        a: "Poisson distribution",
        b: "Binomial distribution",
        c: "Exponential distribution",
        d: "Normal distribution",
        correct: "b",
    },
    {
        question: "Which distribution is the exponential distribution a special case of?",
        a: "Poisson distribution",
        b: "Continuous uniform distribution",
        c: "Beta distribution",
        d: "Gamma distribution",
        correct: "d",
    },
    {
        question: "What are the mean and standard deviation values of a standard normal distribution?",
        a: "Mean = 0, standard deviation = 1",
        b: "Mean = 1, standard deviation = 1",
        c: "Mean = 1, standard deviation = 0",
        d: "Mean = 0, standard deviation = 2",
        correct: "a",
    },
    {
        question: "Which distribution is most similar to the normal distribution?",
        a: "Exponential distribution",
        b: "Poisson distribution",
        c: "Chi-Squared distribution",
        d: "Student's T-distribution",
        correct: "d",
    },
    {
        question: "What does the hypergeometric distribution describe?",
        a: "Placeholder",
        b: "This one!",
        c: "Placeholder",
        d: "Placeholder",
        correct: "b",
    }

];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

// make the quiz randomised and not in order
let score = 0;
let numberOfQuestionsDone = 0;
let questionNumberInGrabBag = Array.from(Array(quizData.length).keys()); //create an array of numbers from 0 to 3 inclusive
let currentQuizData = 0;

loadQuiz();

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function generateRandomQuestionNumber() {
    let randomQuestionNumber = generateRandomNumber(questionNumberInGrabBag.length); //generate numbers from 0 to 3 inclusive
    randomNumber = questionNumberInGrabBag[randomQuestionNumber];  //get the number from the array of 0 to 3
    return randomNumber; //return the number from the array
}

function loadQuiz() {

    deselectAnswers();
    const randomNumber = generateRandomQuestionNumber();
    currentQuizData = quizData[randomNumber];

    const index = questionNumberInGrabBag.indexOf(randomNumber); //get the index of the number in the array
    if (index > -1) {
        questionNumberInGrabBag.splice(index, 1); //gets rid of the number in the array so that it won't be repeated
    }

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
        if (answer === currentQuizData.correct) {
            score++;
        }

        numberOfQuestionsDone++;

        if (numberOfQuestionsDone < quizLength) {
            loadQuiz();
        } else {
            quiz.innerHTML = 
            `<h2 class = "question">You answered ${score}/${quizLength} questions correctly.</h2>
            <button class = "quiz_btn" onclick="location.reload()">Reload</button>`;
        }
    }
});