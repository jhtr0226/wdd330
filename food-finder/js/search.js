import { fetchRecipes } from './mother.mjs';
import { initTemplate } from './header-footer.mjs';
import { dark } from './dark-mode.mjs';
dark();
initTemplate();


const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchForm.search.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });
} else {
    console.error('Search form not found');
}