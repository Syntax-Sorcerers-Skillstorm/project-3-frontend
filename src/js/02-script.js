document.addEventListener("DOMContentLoaded", async function() {
    // Function to fetch data based on quizId
    async function getData(quizId) {
      try {
        const response = await fetch(`http://localhost:8080/questions/${quizId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data.slice(0, 10); // slice funtion returns only 10 questions
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
    // this gets the quiz ID from the URL 
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    if (quizId) {
      const data = await getData(quizId);
      if (data) {
        const ol = document.getElementById('quiz');
        console.log('Ordered list element:', ol); // remove before final version
        data.forEach(question => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div>${question.questionText}</div>
            <input type="radio" name="option${question.questionId}" value="option1"> ${question.option1}<br>
            <input type="radio" name="option${question.questionId}" value="option2"> ${question.option2}<br>
            <input type="radio" name="option${question.questionId}" value="option3"> ${question.option3}<br>
          `;
          ol.appendChild(li);
        });
      }
    }
  });
  
    

    

