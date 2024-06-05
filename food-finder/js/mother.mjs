
import {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    displayFavorites
} from './favorites.js';

const recipeDetails = document.getElementById('recipe-details');
const recipeContent = document.getElementById('recipe-content');
const closeDetails = document.getElementById('close-details');
const apiKey = 'e38eac8751c04ae4a4442698cb4e87e7';

function closing() {
    closeDetails.addEventListener('click', () => {
        recipeDetails.classList.add('hidden');
        recipeContent.innerHTML = '';
    });
}

function getIngredients(type) {
    const ingredientsList = JSON.parse(localStorage.getItem(`${type}-ingredients`)) || [];
    return ingredientsList;
}

async function fetchRecipes(searchQuery) {
    try {
        const [response1, response2] = await Promise.all([
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${apiKey}`),
            fetch('../data/new-recipes.json')
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();

        let localRecipes = JSON.parse(localStorage.getItem('local-recipes')) || [];

        localRecipes = localRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));

        const recipes = [...data1.results, ...data2, ...localRecipes];

        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

async function fetchRecipesByIngredients(ingredients, type) {
    const queryParam = type === 'include' ? 'includeIngredients' : 'excludeIngredients';
    const url = `https://api.spoonacular.com/recipes/complexSearch?${queryParam}=${ingredients.join(',')}&number=10&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        let localRecipes = JSON.parse(localStorage.getItem('local-recipes')) || [];
        localRecipes = localRecipes.filter(recipe => {
            if (type === 'include') {
                return ingredients.every(ing => recipe.ingredients.map(i => i.toLowerCase()).includes(ing.toLowerCase()));
            } else {
                return !ingredients.some(ing => recipe.ingredients.map(i => i.toLowerCase()).includes(ing.toLowerCase()));
            }
        });

        const recipes = [...data.results, ...localRecipes];

        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    if (!recipesContainer) {
        console.error('Recipes container not found');
        return;
    }
    recipesContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeTitle = document.createElement('h4');
        recipeTitle.textContent = recipe.title;
        recipeCard.appendChild(recipeTitle);

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;
        recipeCard.appendChild(recipeImage);

        recipeCard.addEventListener('click', () => {
            window.location.href = `../details-page/index.html?id=${recipe.id}`;
        });

        recipesContainer.appendChild(recipeCard);
    });
}

async function fetchRecipeDetails(id) {
    if (id.startsWith('local_')) {
        const localRecipe = getLocalRecipeById(id);
        return localRecipe;
    } else {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            throw error;
        }
    }
}

function getLocalRecipeById(id) {
    const localRecipes = JSON.parse(localStorage.getItem('local-recipes')) || [];
    return localRecipes.find(recipe => recipe.id === id);
}

function displayRecipeDetails(recipe) {
    const recipeContent = document.getElementById('recipe-content');
    if (!recipeContent) {
        console.error('Recipe content container not found');
        return;
    }

    const ingredientsHtml = recipe.ingredients ?
        recipe.ingredients.map(ing => `<li>${ing}</li>`).join('') :
        recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('');

    const instructionsHtml = recipe.instructions || "No instructions available.";

    const favoriteButtonHtml = isFavorite(recipe.id)
        ? `<button id="remove-favorite" class="favorite-button">Remove from Favorites</button>`
        : `<button id="add-favorite" class="favorite-button">Add to Favorites</button>`;

    recipeContent.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>
            ${ingredientsHtml}
        </ul>
        <h3>Instructions:</h3>
        <p>${instructionsHtml}</p>
        ${favoriteButtonHtml}
    `;

    if (isFavorite(recipe.id)) {
        document.getElementById('remove-favorite').addEventListener('click', () => {
            removeFromFavorites(recipe.id);
            displayRecipeDetails(recipe);
        });
    } else {
        document.getElementById('add-favorite').addEventListener('click', () => {
            addToFavorites(recipe);
            displayRecipeDetails(recipe);
        });
    }

    recipeDetails.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('view-favorites-button')) {
        document.getElementById('view-favorites-button').addEventListener('click', displayFavorites);
    }
    displayFavorites();
});

export {
    getIngredients,
    fetchRecipes,
    fetchRecipesByIngredients,
    displayRecipes,
    fetchRecipeDetails,
    displayRecipeDetails,
    closing,
    displayFavorites
};
