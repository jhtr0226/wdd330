import { getIngredients, fetchRecipesByIngredients } from './mother.mjs';
import { initTemplate } from './header-footer.mjs';
import { dark } from './dark-mode.mjs';
import { addIngredient, loadIngredients } from './ingredients-list.mjs';

dark();
initTemplate();

document.addEventListener('DOMContentLoaded', () => {
    const searchWithoutIngredientsButton = document.getElementById('search-without-ingredients');

    if (searchWithoutIngredientsButton) {
        searchWithoutIngredientsButton.addEventListener('click', () => {
            const ingredients = getIngredients('without');
            if (ingredients.length > 0) {
                fetchRecipesByIngredients(ingredients, 'exclude');
            }
        });
    }
    window.addIngredient = addIngredient;

    loadIngredients('without');
});