const quizSelect = document.querySelectorAll('.quiz-topic'); // query selector corresponds to all elements that match parameter
console.log(`${quizSelect}`);

    quizSelect.forEach(button => {
        button.addEventListener('click', () => {
            const quizId = button.getAttribute('data-quizId'); // this should match the quiz ID from DB
            
            window.location.href = `quiz.html?type=${encodeURIComponent(quizId)}`;
        }); //encodeURI inserts valid characters into url
    });


