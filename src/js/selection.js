document.addEventListener("DOMContentLoaded", function() {
  // Modal elements
  const modal = document.getElementById("quizModal");
  const closeModal = document.getElementsByClassName("close")[0];
  const modalDescription = document.getElementById("modal-description");
  const startQuiz = document.getElementById("start-quiz");

  // manually create quiz descriptions --- consider requesting from API if time permits

  const quizDescription = {
    1: "Java Basics covers fundamental concepts of Java programming including syntax, data types, control flow, and object-oriented programming.",
    2: "HTML/CSS includes the foundational knowledge needed to create and style web pages using HTML for structure and CSS for design and layout.",
    3: "Angular focuses on the features and functionalities of the Angular framework for building dynamic and modern web applications.",
    4: "JavaScript encompasses the essentials of JavaScript programming, including variables, functions, events, and DOM manipulation.",
    5: "Conjure random quiz includes a mix of various topics to challenge your knowledge."
  };

  // this will open the modal when user clicks on a button
  function quizPreview(e) {

    // buttonID should be the same as the quiz ID

    const buttonId = e.target.id;
    modalDescription.textContent = quizDescription[buttonId];
    modal.style.display = "block";
    
    // Set the start quiz button link
    startQuiz.onclick = function() {
      window.location.href = `quiz.html?categoryId=${buttonId}`;
    };
  }

  // needed to parse the button ID from the descripton in order to determin the correct quiz previewS
  // hasOwnProperty docs https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
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

  // found this resource to handle edge cases below
  closeModal.onclick = function() {
    modal.style.display = "none";
  }

  // found this one to handle clicking outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
