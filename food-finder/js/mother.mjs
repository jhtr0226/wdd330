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

async function fetchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.results);
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
        displayRecipes(data.results);
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
            fetchRecipeDetails(recipe.id);
        });

        recipesContainer.appendChild(recipeCard);
    });
}

async function fetchRecipeDetails(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipeDetails(data);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    recipeContent.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${recipe.instructions}</p>
    `;
    recipeDetails.classList.remove('hidden');
}

export {
    getIngredients,
    fetchRecipes,
    fetchRecipesByIngredients,
    displayRecipes,
    fetchRecipeDetails,
    displayRecipeDetails,
    closing
};