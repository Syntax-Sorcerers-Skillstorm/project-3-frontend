
document.addEventListener("DOMContentLoaded", function() {
  // Contact Modal elements
  const contactButton = document.getElementById('contactButton');
  const modalContact = document.getElementById('modal-contact');
  const closeButton = document.getElementById('closeButton');

  // Event listener for opening the contact modal
  contactButton.onclick = function() {
    modalContact.style.display = "block";
  }

  // Event listener for closing the contact modal
  closeButton.onclick = function() {
    modalContact.style.display = "none";
  }

  // Event listener for closing the contact modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modalContact) {
      modalContact.style.display = "none";
    }
  }

  // Quiz Modal elements
  const quizModal = document.getElementById("quizModal");
  const closeQuizButton = document.getElementById("closeQuizButton");
  const modalDescription = document.getElementById("modal-description");
  const startQuiz = document.getElementById("start-quiz");

  // Quiz descriptions
  const quizDescription = {
    1: "Java Basics quiz covers fundamental concepts of Java programming including syntax, data types, control flow, and object-oriented programming.",
    2: "HTML/CSS quiz includes the foundational knowledge needed to create and style web pages using HTML for structure and CSS for design and layout.",
    3: "Angular quiz focuses on the features and functionalities of the Angular framework for building dynamic and modern web applications.",
    4: "JavaScript quiz encompasses the essentials of JavaScript programming, including variables, functions, events, and DOM manipulation.",
    5: "Generate a random quiz which includes a mix of various topics to designed tochallenge your knowledge."
  };

  // Function to open the quiz modal
  function quizPreview(e) {
    const buttonId = e.target.id;
    modalDescription.textContent = quizDescription[buttonId];
    quizModal.style.display = "block";

    // Set the start quiz button link
    startQuiz.onclick = function() {
      window.location.href = `quiz.html?categoryId=${buttonId}`;
    };
  }

  // Add event listeners to quiz buttons
  for (let id in quizDescription) {
    if (quizDescription.hasOwnProperty(id)) {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener("click", quizPreview);
      } else {
        console.error(`Button with id="${id}" not found`);
      }
    }
  }

  // Close quiz modal on close button click
  closeQuizButton.onclick = function() {
    quizModal.style.display = "none";
  }

  // Close quiz modal on clicking outside of the modal
  window.onclick = function(event) {
    if (event.target == quizModal) {
      quizModal.style.display = "none";
    }
  }
});
