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

        alert('Recipe added successfully!');
        event.target.reset();
    } catch (error) {
        console.error('Error adding recipe:', error);
        alert('Failed to add recipe.');
    }
}