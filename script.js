
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const timerElement = document.getElementById('time');
    const highscoreSection = document.getElementById('highscore-section');
    const finalScoreElement = document.getElementById('final-score');
    const initialsInput = document.getElementById('initials');
    const highscoreForm = document.getElementById('highscore-form');

    let shuffledQuestions, currentQuestionIndex;
    let timerInterval;
    let time = 60; // Set the quiz time limit here

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    highscoreForm.addEventListener('submit', saveHighScore);

    function startGame() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        timerElement.textContent = time;
        startTimer();
        setNextQuestion();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            time--;
            timerElement.textContent = time;
            if (time <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            endGame();
        }
        if (!correct) {
            if (time > 10) time -= 10;
            else time = 0;
            timerElement.textContent = time;
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function endGame() {
        clearInterval(timerInterval);
        questionContainerElement.classList.add('hide');
        highscoreSection.classList.remove('hide');
        finalScoreElement.textContent = time;
    }

    function saveHighScore(e) {
        e.preventDefault();
        const initials = initialsInput.value;
        // Add logic to save the high score
        console.log(`Score saved: ${initials} - ${time}`);
        // Redirect to high score page or reset the game
    }

    const questions = [
        {
            question: 'What is 2 + 2?',
            answers: [
                { text: '4', correct: true },
                { text: '22', correct: false },
                { text: '5', correct: false },
                { text: '3', correct: false }
            ]
        },
        // Add more questions here
    ];
});