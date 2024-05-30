// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Welcome to Project 3 Frontend');
// })


document.addEventListener('DOMContentLoaded', () => {
    const quizSelectors = document.querySelectorAll('.quiz-selector');

    quizSelectors.forEach(button => {
        button.addEventListener('click', () => {
            const quizType = button.getAttribute('data-quiz');
            window.location.href = `102-quiz.html?type=${quizType}`;
        });
    });
});
