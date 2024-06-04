const apiKey = 'e38eac8751c04ae4a4442698cb4e87e7';
document.getElementById('view-history-button').addEventListener('click', displayHistory);
document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
});
function addToHistory(recipe) {
    let history = JSON.parse(localStorage.getItem('recipe-history')) || [];
    history = history.filter(item => item.id !== recipe.id); // Remove if already in history
    history.unshift(recipe); // Add to the beginning
    if (history.length > 10) history.pop(); // Limit history to 10 items
    localStorage.setItem('recipe-history', JSON.stringify(history));
}

function displayHistory() {
    const historyContainer = document.getElementById('history');
    if (!historyContainer) {
        console.error('History container not found');
        return;
    }
    const history = JSON.parse(localStorage.getItem('recipe-history')) || [];
    historyContainer.innerHTML = '';

    history.forEach(recipe => {
        const historyCard = document.createElement('div');
        historyCard.classList.add('history-card');

        const historyTitle = document.createElement('h4');
        historyTitle.textContent = recipe.title;
        historyCard.appendChild(historyTitle);

        const historyImage = document.createElement('img');
        historyImage.src = recipe.image;
        historyImage.alt = recipe.title;
        historyCard.appendChild(historyImage);

        historyCard.addEventListener('click', () => {
            window.location.href = `../details-page/index.html?id=${recipe.id}`;
        });

        historyContainer.appendChild(historyCard);
    });
}

export {
    addToHistory,
    displayHistory
};