import { fetchRecipeDetails, displayRecipeDetails, fetchNutritionInfo, fetchSimilarRecipes } from './mother.mjs';
import { dark } from './dark-mode.mjs';
import { initTemplate } from './header-footer.mjs';

dark();
initTemplate();


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        try {
            const recipe = await fetchRecipeDetails(recipeId);
            displayRecipeDetails(recipe);

            const nutrition = await fetchNutritionInfo(recipeId);
            displayNutritionInfo(nutrition);

            const similarRecipes = await fetchSimilarRecipes(recipeId);
            displaySimilarRecipes(similarRecipes);


        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    } else {
        console.error('No recipe ID found in the URL.');
    }
});


function displayNutritionInfo(nutrition) {
    if (!nutrition) {
        console.error('No nutritional information available');
        return;
    }
    const nutritionContainer = document.getElementById('nutrition-info');
    if (!nutritionContainer) {
        console.error('Nutrition info container not found');
        return;
    }
    nutritionContainer.innerHTML = `
        <h3>Nutritional Information</h3>
        <p>Calories: ${nutrition.calories}</p>
        <p>Carbs: ${nutrition.carbs}</p>
        <p>Fat: ${nutrition.fat}</p>
        <p>Protein: ${nutrition.protein}</p>
    `;
}

function displaySimilarRecipes(recipes) {
    const similarRecipesContainer = document.getElementById('similar-recipes');
    if (!similarRecipesContainer) {
        console.error('Similar recipes container not found');
        return;
    }
    similarRecipesContainer.innerHTML = '<h3>Similar Recipes</h3>';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        const imageUrl = `https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`;
        recipeCard.innerHTML = `
            <h4>${recipe.title}</h4>
            <a href="../details-page/index.html?id=${recipe.id}"><img src="${imageUrl}" alt="${recipe.title}"></a>`;
        recipeCard.addEventListener('click', () => {
            window.location.href = `../details-page/index.html?id=${recipe.id}`;
        });
        similarRecipesContainer.appendChild(recipeCard);
    });
}