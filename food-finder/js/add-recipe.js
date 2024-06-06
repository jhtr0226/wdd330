import { dark } from "./dark-mode.mjs";
import { initTemplate } from "./header-footer.mjs";
initTemplate();
dark();

document.getElementById('add-recipe-form').addEventListener('submit', handleFormSubmission);

async function handleFormSubmission(event) {
    event.preventDefault();

    const dishName = document.getElementById('dish-name').value;
    const imageUrl = document.getElementById('image-url').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;

    const newRecipe = {
        id: `local_${Date.now()}`,
        title: dishName,
        image: imageUrl,
        ingredients: ingredients.map(ingredient => ingredient.trim()),
        instructions: instructions
    };

    try {
        let localRecipes = JSON.parse(localStorage.getItem('local-recipes')) || [];
        localRecipes.push(newRecipe);
        localStorage.setItem('local-recipes', JSON.stringify(localRecipes));

        const message = await getRandomNewRecipeMessage();
        displayCustomAlert(message);
        event.target.reset();
    } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Failed to add recipe.');
    }
}

async function getRandomNewRecipeMessage() {
    try {
        const response = await fetch('../data/new-recipe-messages.json');
        const data = await response.json();
        const messages = data.messages;
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    } catch (error) {
        console.error('Error fetching random new recipe message:', error);
        return 'Thanks! That looks pretty good!';
    }
}


function displayCustomAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('custom-alert');
    alertContainer.textContent = message;

    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.classList.add('fade-out');
        setTimeout(() => {
            alertContainer.remove();
        }, 500);
    }, 2000);
}