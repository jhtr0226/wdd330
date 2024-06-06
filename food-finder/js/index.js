import { dark } from "./dark-mode.mjs";
import { displayFavorites } from "./favorites.js";

const favoritesModal = document.getElementById('favorites-modal');
const viewFavoritesButton = document.getElementById('view-favorites-button');
const closeFavoritesButton = document.getElementById('close-favorites');

function showFavoritesModal() {
    displayFavorites();
    favoritesModal.classList.remove('hidden');
    favoritesModal.style.display = 'block';
}

function closeFavoritesModal() {
    favoritesModal.classList.add('hidden');
    favoritesModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    if (viewFavoritesButton) {
        viewFavoritesButton.addEventListener('click', showFavoritesModal);
    }
    if (closeFavoritesButton) {
        closeFavoritesButton.addEventListener('click', closeFavoritesModal);
    }
    displayFavorites();

});
dark();
