// do I have a key value pair issues as Erica discused yesterday in the angualr lecture?
    const urlParam = new URLSearchParams(window.location.search);
    const quizId = urlParam.get('Id');

    function loadQuiz(quizId) {
        let endpoint;

        switch (quizId) {
            case '1':
                endpoint = 'https://jsonplaceholder.typicode.com/posts?java';
                break;
            case '2':
                endpoint = 'https://jsonplaceholder.typicode.com/posts?html';
                break;
            case '3':
                endpoint = 'https://jsonplaceholder.typicode.com/posts?js';
                break;
            case '4':
                endpoint = 'https://jsonplaceholder.typicode.com/posts?angular';
                break;
            default:
                endpoint = 'https://jsonplaceholder.typicode.com/posts'; // homepage
                break;
        }

        fetch(endpoint) // fetches the specfied endpoint
            .then(response => { // turns that into an object called response
                if (!response.ok) {
                    throw new Error('response.status text=', response.statusText); // edge case
                }
                return response.json(); // returns the object as JSON data
            })
            .then(fetchedData => QuizQuestions(fetchedData)) // json data is stored in fetchedData and passed to funtion to get Questions
            // error handeling?
    }

    function QuizQuestions(questions) { // function to store the quiz questions in the quiz container tag
        const quizContainer = document.getElementById('quiz-container');
    }

        quizContainer.innerHTML = ''; // this is used to container before adding new questions
        questions = questions.slice(0, 10); //  returns 10 questions - is this exclusive?

        // this is where I left off. I need the questions to appear in a random order
        // do I need to implement a numbered list/table to store the questions 
        // ie how will they show up on the page?
        // do I need radio buttons in place to store the answers?\
        // need a submit button that launches the results page ans calculates/displays the score    

            

            
    

    

