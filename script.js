const quizData = [
    {
      question: "What is the capital of France?",
      options: {
        A: "Berlin",
        B: "Madrid",
        C: "Paris",
        D: "Rome"
      },
      correct: "C"
    },
    {
      question: "Which language runs in a web browser?",
      options: {
        A: "Java",
        B: "C++",
        C: "Python",
        D: "JavaScript"
      },
      correct: "D"
    },
    {
      question: "What does CSS stand for?",
      options: {
        A: "Central Style Sheets",
        B: "Cascading Style Sheets",
        C: "Cascading Simple Sheets",
        D: "Cars SUVs Sailboats"
      },
      correct: "B"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById('question');
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');
  const endGameElement = document.querySelector('.end-game');
  
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    document.querySelectorAll('.options button').forEach((button, index) => {
      const option = String.fromCharCode(65 + index); // A, B, C, D
      button.textContent = `${option}: ${currentQuestion.options[option]}`;
      button.classList.remove('correct', 'wrong');
      button.disabled = false;
    });
    resultElement.textContent = '';
    endGameElement.style.display = 'none';
    updateScore();
  }
  
  function checkAnswer(answer) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(button => button.disabled = true);
  
    if (answer === currentQuestion.correct) {
      resultElement.textContent = 'Correct!';
      score++;
      currentQuestionIndex++;
      setTimeout(() => {
        loadQuestion();
      }, 1000);
      document.querySelector(`.options button:nth-child(${answer.charCodeAt(0) - 64})`).classList.add('correct');
  
      if (currentQuestionIndex < quizData.length) {
        setTimeout(() => {
          loadQuestion();
        }, 1000); // Load the next question after a short delay
      } else {
        showFinalScore(); // Show the final score
      }
    } else {
      resultElement.textContent = 'Wrong!';
      currentQuestionIndex++;
      setTimeout(() => {
        loadQuestion();
      }, 1000);
      document.querySelector(`.options button:nth-child(${answer.charCodeAt(0) - 64})`).classList.add('wrong');
      document.querySelector(`.options button:nth-child(${currentQuestion.correct.charCodeAt(0) - 64})`).classList.add('correct');
      endGameElement.style.display = 'block';
    }
  }
  
  function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
  }
  
  function showFinalScore() {
    questionElement.textContent = `Quiz completed! Your score is ${score} out of ${quizData.length}.`;
    document.querySelector('.options').style.display = 'none';
    resultElement.style.display = 'none';
    endGameElement.style.display = 'block';
  }
  
  function resetGame() {
    location.reload(); // Refresh the page to reset the game
  }
  
  function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector('.options').style.display = 'block';
    resultElement.style.display = 'block';
    endGameElement.style.display = 'none';
    loadQuestion();
  }
  
  function continueQuiz() {
    alert('Continue to the next quiz!');
  }
  
  // Load the first question initially
  loadQuestion();