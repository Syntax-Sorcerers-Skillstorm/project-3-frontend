document.addEventListener("DOMContentLoaded", async function() {

  // Fetch data based on categoryId or random
  async function getData(categoryId) {
    const url = categoryId === 'random' ? 'http://localhost:8080/random' : `http://localhost:8080/questions/category/${categoryId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      return data.slice(0, 10); // Return only the first 10 questions
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // Submit answers initiates POST request to backend
  async function submitQuiz(form) {
    const formData = new FormData(form);
    const userAnswers = [];
    formData.forEach((value, key) => {
      userAnswers.push({ questionId: key.replace('option', ''), answer: value });
    });

    try {
      // POST request to backend
      const response = await fetch('http://localhost:8080/answers/submit', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAnswers)
      });

      const result = await response.json();

      // Null avoidance to ensure score object exists in result
      if (result && result.score !== undefined) {
        // Need this to open the results page on click
        const url = new URL(window.location.href);
        url.pathname = 'src/resultspage.html'; 
        // Sets URL path to /score
        url.searchParams.set('score', result.score);
        window.location.href = url.toString();
      } else {
        console.error('Result or score is not defined:', result);
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  }

  // Function to open modal
  function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }

  // Function to close modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  // Parse parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');
  const isRandom = urlParams.get('random');

  if (categoryId || isRandom) {
    const quizData = await getData(isRandom ? 'random' : categoryId);
    if (quizData) {
      const ol = document.getElementById('quiz');
      quizData.forEach(question => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>${question.questionText}</div>
          <label><input type="radio" name="option${question.questionId}" value="${question.option1}"> ${question.option1}</label><br>
          <label><input type="radio" name="option${question.questionId}" value="${question.option2}"> ${question.option2}</label><br>
          <label><input type="radio" name="option${question.questionId}" value="${question.option3}"> ${question.option3}</label><br>
        `;
        ol.appendChild(li);
      });
    } else {
      console.error('Could not generate quiz:');
    }
  } else {
    console.error('No matching quiz ID');
  }

  // Modal event listeners
  document.querySelectorAll('.close').forEach(function(closeButton) {
    closeButton.addEventListener('click', function() {
      closeModal(this.getAttribute('data-modal'));
    });
  });

  window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id);
    }
  };

  // Back button modal
  document.getElementById('backButton').addEventListener('click', function() {
    openModal('backModal');
  });

  document.getElementById('confirmExit').addEventListener('click', function() {
    window.location.href = 'selection.html';
  });

  // Submit button modal
  document.getElementById('submitButton').addEventListener('click', function() {
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let unansweredQuestions = false;

    // Check for unanswered questions
    const questions = document.querySelectorAll('ol#quiz > li');
    questions.forEach((question, index) => {
      const radioButtons = question.querySelectorAll('input[type="radio"]');
      let answered = false;
      radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          answered = true;
        }
      });
      if (!answered) {
        unansweredQuestions = true;
      }
    });

    if (unansweredQuestions) {
      openModal('submitModal');
    } else {
      submitQuiz(form);
    }
  });

  document.getElementById('confirmSubmit').addEventListener('click', function() {
    const form = document.getElementById('quiz-form');
    submitQuiz(form);
  });

});



