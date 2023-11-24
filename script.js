
document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-btn');
    const questionContainerElement = document.getElementById('question-container');
    const timerElement = document.getElementById('time-left');
    const highscoresLink = document.getElementById('highscores');
    const endScreenElement = document.getElementById('end-screen');
    const finalScoreElement = document.getElementById('final-score');
    const initialsInputElement = document.getElementById('initials');
    const submitScoreButton = document.getElementById('submit-score');
    const feedbackContainer = document.getElementById('feedback-container');
    const clearHighscoresButton = document.getElementById('clear-highscores');
    if (clearHighscoresButton) {
        clearHighscoresButton.addEventListener('click', clearHighscores);
    } else {
        console.log('Clear Highscores button not found');
    }
    const restartButton = document.getElementById('restart-game');
    restartButton.addEventListener('click', resetGame);

    let shuffledQuestions, currentQuestionIndex, score, timerId;
    let timeLeft = 75; // 75 seconds for the quiz

    function startGame() {
        document.getElementById('quiz-intro').classList.add('hide'); // Hide instructions
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        score = 0;
        questionContainerElement.innerHTML = '';
        questionContainerElement.classList.remove('hide');
        timerElement.textContent = timeLeft;
        timerId = setInterval(updateTimer, 1000);
        setNextQuestion();
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }

    function setNextQuestion() {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionContainerElement.innerHTML = '<div>' + question.question + '</div>';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            questionContainerElement.appendChild(button);
        });
    }

    function selectAnswer(answer) {
        const correct = answer.correct;
        if (!correct) {
            timeLeft -= 10; // Subtract time for incorrect answers
            if (timeLeft < 0) timeLeft = 0;
            timerElement.textContent = timeLeft;
        } else {
            score++;
        }
        displayAnswerFeedback(correct);
        setTimeout(() => {
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                endGame();
            }
        }, 1000);
    }

    function displayAnswerFeedback(correct) {
        feedbackContainer.textContent = correct ? 'Correct!' : 'Incorrect!';
        feedbackContainer.classList.remove('hide');
        setTimeout(() => {
            feedbackContainer.classList.add('hide');
        }, 1000);
    }

    function endGame() {
        clearInterval(timerId);
        questionContainerElement.classList.add('hide');
        endScreenElement.classList.remove('hide');
        finalScoreElement.textContent = score;
    }

    function saveHighscore() {
        const initials = initialsInputElement.value.trim();
        if (initials !== '') {
            const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
            const newScore = {
                score: score,
                initials: initials
            };
            highscores.push(newScore);
            localStorage.setItem('highscores', JSON.stringify(highscores));
            showHighscores();
        } else {
            alert('Please enter your initials.');
        }
    }
    // Questions array
    const questions = [
        {
            question: 'Inside which HTML element do we put the JavaScript?',
            answers: [
                { text: '<script>', correct: true },
                { text: '<javascript>', correct: false },
                { text: '<js>', correct: false },
                { text: '<scripting>', correct: false }
            ]
        },
        {
            question: 'What is the correct syntax for referring to an external script called "app.js"?',
            answers: [
                { text: '<script href="app.js">', correct: false },
                { text: '<script name="app.js">', correct: false },
                { text: '<script src="app.js">', correct: true },
                { text: '<script file="app.js">', correct: false }
            ]
        },
        {
            question: 'How do you write "Hello World" in an alert box?',
            answers: [
                { text: 'msg("Hello World");', correct: false },
                { text: 'alert("Hello World");', correct: true },
                { text: 'alertBox("Hello World");', correct: false },
                { text: 'msgBox("Hello World");', correct: false }
            ]
        },
        {
            question: 'What is the time complexity of a binary search algorithm?',
            answers: [
                { text: 'O(n)', correct: false },
                { text: 'O(n^2)', correct: false },
                { text: 'O(log n)', correct: true },
                { text: 'O(1)', correct: false }
            ]
        },
        {
            question: 'What is the difference between a variable and a constant?',
            answers: [
                { text: 'A variable can be changed, a constant cannot.', correct: true },
                { text: 'A variable can be changed, a constant can be changed.', correct: false },
                { text: 'A variable can be changed, a constant cannot be changed.', correct: false },
                { text: 'A variable cannot be changed, a constant cannot be changed.', correct: false },
            ]
        },
        {
            question: 'Which data structure uses LIFO (Last In, First Out) ordering?',
            answers: [
                { text: 'Queue', correct: false },
                { text: 'Stack', correct: true },
                { text: 'Array', correct: false },
                { text: 'Linked List', correct: false },
                { text: 'Binary Tree', correct: false },
                { text: 'Graph', correct: false },
            ]
        },
        {
            question: 'What is the difference between a function and a method?',
            answers: [
                { text: 'A function is a standalone entity, a method is a part of an object.', correct: true },
                { text: 'A function is a standalone entity, a method is a part of a class.', correct: false },

            ]
        },
        {
            question: 'What is the difference between a class and an object?',
            answers: [
                { text: 'A class is a blueprint for creating objects, an object is an instance of a class.', correct: true },
                { text: 'A class is a blueprint for creating objects, an object is an instance of a class.', correct: false },

            ]
        },
        {
            question: 'What is the difference between a function and a variable?',
            answers: [
                { text: 'A function is a standalone entity, a variable is a part of an object.', correct: true },
                { text: 'A function is a standalone entity, a variable is a part of a class.', correct: false },
            ]
        },
        {
            question: 'What is the difference between a function and a class?',
            answers: [
                { text: 'A function is a standalone entity, a class is a part of an object.', correct: true },
                { text: 'A function is a standalone entity, a class is a part of a class.', correct: false },

            ]
        },
        {
            question: 'How do you reverse a string in JavaScript?',
            answers: [
                { text: '"Hello".reverse()', correct: false },
                { text: '"Hello".split("").reverse().join("")', correct: true },
                { text: 'reverse("Hello")', correct: false },
                { text: '"Hello".split().reverse()', correct: false },
            ]
        },

        {
            question: 'Which of the following is an example of a NoSQL database?',
            answers: [
                { text: 'MySQL', correct: false },
                { text: 'Oracle', correct: false },
                { text: 'MongoDB', correct: true },
                { text: 'SQL Server', correct: false },
            ]
        },
        {
            question: 'What does the "git pull" command do?',
            answers: [
                { text: 'Sends local commits to the remote repository', correct: false },
                { text: 'Downloads content from a remote repository and immediately updates the local repository to match that content', correct: true },
                { text: 'Stashes your local changes', correct: false },
                { text: 'Shows the commit history', correct: false },
            ]
        },
        // More questions can be added here
    ];

    function showHighscores() {
        clearInterval(timerId);
        document.getElementById('quiz-intro').classList.add('hide');
        document.getElementById('question-container').classList.add('hide');
        document.getElementById('end-screen').classList.add('hide');
        const highscoresContainer = document.getElementById('highscores-container');
        const highscoreList = document.getElementById('highscore-list');
        highscoresContainer.classList.remove('hide');
        highscoreList.innerHTML = '';
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.sort((a, b) => b.score - a.score);
        highscores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `${score.initials}: ${score.score} `;
            highscoreList.appendChild(li);
        });
    }

    function goBack() {
        resetGame();
    }

    function clearHighscores() {
        localStorage.removeItem('highscores');
        document.getElementById('highscore-list').innerHTML = '';
    }

    function resetGame() {
        document.getElementById('highscores-container').classList.add('hide');
        document.getElementById('end-screen').classList.add('hide');
        questionContainerElement.classList.add('hide');
        document.getElementById('quiz-intro').classList.remove('hide');
        startButton.classList.remove('hide');
        score = 0;
        timeLeft = 75;
        timerElement.textContent = timeLeft;
    }

    startButton.addEventListener('click', startGame);
    submitScoreButton.addEventListener('click', saveHighscore);
    highscoresLink.addEventListener('click', showHighscores);
});