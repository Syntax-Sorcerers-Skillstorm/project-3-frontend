document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizType = urlParams.get('type');

    function loadQuizData(quizType) {
        let apiUrl;

        switch (quizType) {
            case 'math':
                apiUrl = 'https://jsonplaceholder.typicode.com/posts?math';
                break;
            case 'science':
                apiUrl = 'https://jsonplaceholder.typicode.com/posts?science';
                break;
            case 'history':
                apiUrl = 'https://jsonplaceholder.typicode.com/posts?history';
                break;
            default:
                console.log('Invalid quiz type');
                return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayQuizQuestions(data))
            .catch(error => console.log('Could not load quiz data:', error));
    }

    function displayQuizQuestions(questions) {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) {
            return;
        }
        quizContainer.innerHTML = ''; // Clear the container before adding new questions
        questions.slice(0, 5).forEach((question, index) => { // Limit to 5 questions for simplicity
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h2');
            questionTitle.textContent = `Question ${index + 1}: ${question.title}`;
            questionElement.appendChild(questionTitle);

            const answerLabel = document.createElement('label');
            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = `question${index}`;
            answerInput.value = question.body;

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(question.body));
            questionElement.appendChild(answerLabel);
            questionElement.appendChild(document.createElement('br'));

            quizContainer.appendChild(questionElement);
        });
    }

    loadQuizData(quizType);
});