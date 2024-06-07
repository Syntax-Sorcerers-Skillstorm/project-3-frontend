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
        const tableRow = document.querySelector('#result-container tbody tr');

        
        if (scoreElement && percentageElement && statusElement) {
            // Set text content
            scoreElement.innerText = `${scoreInt}/10`;
            percentageElement.innerText = `${percentage}%`;
            statusElement.innerText = status;

            // Change row color based on status
            if (status === 'Pass') {
                tableRow.style.backgroundColor = 'green';
                tableRow.style.color = 'white';

                // Add success message
                const message = document.createElement('p');
                message.textContent = 'Congratulations! You passed!';
                message.className = 'success-message';
                document.getElementById('result-container').appendChild(message);
            } else {
                tableRow.style.backgroundColor = 'red';
                tableRow.style.color = 'white';

                // Add failure message and resource links
                const message = document.createElement('p');
                message.textContent = 'We noticed that you didn’t pass this time. Here are some resources to help you improve:';
                message.className = 'fail-message';

                const resources = [
                    { text: 'Resource 1', url: 'https://example.com/resource1' },
                    { text: 'Resource 2', url: 'https://example.com/resource2' },
                    { text: 'Resource 3', url: 'https://example.com/resource3' }
                ];

                const resourceList = document.createElement('ol');
                resourceList.className = 'resource-list';
                resources.forEach(resource => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = resource.url;
                    link.textContent = resource.text;
                    link.style.color = 'white';  // Ensure the links are visible on the red background
                    listItem.appendChild(link);
                    resourceList.appendChild(listItem);
                });

                const resultContainer = document.getElementById('result-container');
                resultContainer.appendChild(message);
                resultContainer.appendChild(resourceList);
            }

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



