// remove event listener since this is redundant... but verify functionality first
document.addEventListener("DOMContentLoaded", async function() {

  // fetch data based on categoryId
  async function getData(categoryId) {
    try {
      const response = await fetch(`http://localhost:8080/questions/category/${categoryId}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      return data.slice(0, 10); // Return only the first 10 questions
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  // parse categoryId from URL
  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  //https://stackoverflow.com/questions/14395090/what-is-location-search-in-javascript
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('categoryId');
  if (categoryId) {
    const quizData = await getData(categoryId);
    if (quizData) {
      const ol = document.getElementById('quiz');
      quizData.forEach(question => {
        const li = document.createElement('li');
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        // hardcoded ol and buttons first and then used that to help create the template below
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



  //event listener needed to collect user answers
  const form = document.getElementById('quiz-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect user answers
    const formData = new FormData(form);
    const userAnswers = [];
    formData.forEach((value, key) => {
      userAnswers.push({ questionId: key.replace('option', ''), answer: value });
    });

    console.log('User Answers:', userAnswers); // Debugging line

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
      console.log('Result from Backend:', result); 

      // edge case & error handeling
      if (result && result.score !== undefined) {

        // need this to open the results page on click
        const url = new URL(window.location.href);
        url.pathname = 'src/resultspage.html' 
        url.searchParams.set('score', result.score);
        console.log('Navigating to:', url.toString()); 
        window.location.href = url.toString();
      } else {
        console.error('Result or score is not defined:', result);
      }
    } catch (error) {
      console.error('Error submitting answers:', e);
    }
  });
});

