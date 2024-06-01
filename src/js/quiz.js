document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    const quizData = []; // Empty array to store the fetched data

    async function fetchQuizData(quizId) {
        let endpoint;

        switch (quizId) {
            case '1':
                endpoint = 'http://localhost:8080/questions';
                break;
            case '2':
                endpoint = 'http://localhost:8080/questions';
                break;
            case '3':
                endpoint = 'http://localhost:8080/questions';
                break;
            case '4':
                endpoint = 'http://localhost:8080/questions';
                break;
            default:
                endpoint = 'http://localhost:8080/questions';
                break;
        }

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            quizData.push(...data); // Spread the fetched data into the quizData array
            displayQuizQuestions(quizData);
        } catch (error) {
            console.error('Could not load quiz data:', error);
        }
    }

    function displayQuizQuestions(questions) {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        quizContainer.innerHTML = ''; // Clear the container before adding new questions
        questions.slice(0,10).forEach((question, index) => { // Iterate through each question
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h2');
            questionTitle.textContent = `Question ${index + 1}: ${question.questionText}`;
            questionElement.appendChild(questionTitle);

            // Create radio buttons for each option
            ['option1', 'option2', 'option3'].forEach(optionKey => {
                const answerLabel = document.createElement('label');
                const answerInput = document.createElement('input');
                answerInput.type = 'radio';
                answerInput.name = `question${index}`;
                answerInput.value = question[optionKey];

                answerLabel.appendChild(answerInput);
                answerLabel.appendChild(document.createTextNode(question[optionKey]));
                questionElement.appendChild(answerLabel);
                questionElement.appendChild(document.createElement('br'));
            });

            quizContainer.appendChild(questionElement);
        });
    }

    await fetchQuizData(quizId); // Fetch and display quiz data on page load
});