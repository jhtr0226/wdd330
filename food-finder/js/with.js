import { getIngredients, fetchRecipesByIngredients } from './mother.mjs';
import { initTemplate } from './header-footer.mjs';
import { dark } from './dark-mode.mjs';
import { addIngredient, loadIngredients } from './ingredients-list.mjs';

dark();
initTemplate();

document.addEventListener('DOMContentLoaded', () => {
    const searchWithIngredientsButton = document.getElementById('search-with-ingredients');

    if (searchWithIngredientsButton) {
        searchWithIngredientsButton.addEventListener('click', () => {
            const ingredients = getIngredients('with');
            if (ingredients.length > 0) {
                fetchRecipesByIngredients(ingredients, 'include');
            }
        });
    }
    window.addIngredient = addIngredient;

    loadIngredients('with');
});