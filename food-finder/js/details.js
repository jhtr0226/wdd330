import { fetchRecipeDetails, displayRecipeDetails } from './mother.mjs';
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
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    } else {
        console.error('No recipe ID found in the URL.');
    }
});