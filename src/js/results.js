document.addEventListener("DOMContentLoaded", function() {
    console.log('Results page loaded'); 

    // parse score from URL
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');

    console.log('Score from URL parameters:', score); 

    if (score !== null) {
        const scoreInt = parseInt(score, 10);
        const percentage = (scoreInt / 10) * 100;
        const status = percentage >= 50 ? 'Pass' : 'Fail';

        // create variables for score, percentage, and status elements
        const scoreElement = document.getElementById('score');
        const percentageElement = document.getElementById('percentage');
        const statusElement = document.getElementById('status');

        // edge case check and error handeling
        if (scoreElement && percentageElement && statusElement) {

            // way to display the score in a table
            scoreElement.innerText = `${scoreInt}/10`;
            percentageElement.innerText = `${percentage}%`;
            statusElement.innerText = status;

            console.log('Score:', scoreInt); 
            console.log('Percentage:', percentage); 
            console.log('Status:', status); 
        } else {
            console.error('One or more elements not found in the DOM.');
        }
    } else {
        console.error('Score not found in URL parameters.');
    }
});

