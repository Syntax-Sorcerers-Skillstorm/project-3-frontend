document.addEventListener("DOMContentLoaded", function() {
  // Contact Modal 
  const contactButton = document.getElementById('contactButton');
  const modalContact = document.getElementById('modal-contact');
  const closeButton = document.getElementById('closeButton');

  contactButton.onclick = function() {
    modalContact.style.display = "block";
  }

  closeButton.onclick = function() {
    modalContact.style.display = "none";
  }

  // closes when mouse click outide box
  window.onclick = function(e) {
    if (e.target == modalContact) {
      modalContact.style.display = "none";
    }
  }

  // Quiz description Modal 
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
    5: "Generate a random quiz which includes a mix of various topics to challenge your knowledge."
  };

  function quizPreview(e) {
    const buttonId = e.target.id;
    modalDescription.textContent = quizDescription[buttonId];
    quizModal.style.display = "block";

    // Set url to quiz id or random on start
    startQuiz.onclick = function() {
      if (buttonId === "5") {
        window.location.href = `quiz.html?random=true`;
      } else {
        window.location.href = `quiz.html?categoryId=${buttonId}`;
      }
    };
  }

  // checks to see if quiz button has an ID property and then opens the modal
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

  closeQuizButton.onclick = function() {
    quizModal.style.display = "none";
  }

   // closes when mouse click outide box
  window.onclick = function(e) {
    if (e.target == quizModal) {
      quizModal.style.display = "none";
    }
  }
});

