document.addEventListener("DOMContentLoaded", function() {
    // Array of button IDs
    const buttonIds = [1, 2, 3, 4, 5];
    
    // Function to handle button click
    function handleButtonClick(event) {
      const quizId = event.target.id;
      window.location.href = `quiz.html?quizId=${quizId}`;
    }
  
    // Add event listeners to each button
    buttonIds.forEach(id => {
      const button = document.getElementById(id.toString());
      if (button) {
        button.addEventListener("click", handleButtonClick);
      } else {
        console.error(`Button with id="${id}" not found`);
      }
    });
  });
  