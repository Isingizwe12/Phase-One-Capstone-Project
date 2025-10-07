import { getFavorites, removeFavorite, isFavorite } from './favorites.js';
import { initNavbar } from './index.js';

initNavbar();


// Select the container where favorite books will appear
const favoritesContainer = document.getElementById('favorites-container');

// Function to render favorites
function renderFavorites() {
  const favorites = getFavorites();

  favoritesContainer.innerHTML = ''; // Clear old content

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
      <p class="text-center text-gray-600 text-lg mt-10">
        No favorite books yet 😢 — Go add some from the main page!
      </p>
    `;
    return;
  }

  favorites.forEach(book => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl hover:scale-105';
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="h-48 w-full object-cover">
      <div class="p-4 flex-1 flex flex-col">
        <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
        <p class="text-gray-600 text-sm mb-2">${book.author}</p>
        <p class="text-gray-700 text-sm flex-1">${book.description}</p>
        <button class="remove-fav mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition" data-id="${book.id}">
          ❌ Remove from Favorites
        </button>
      </div>
    `;
    favoritesContainer.appendChild(card);
  });
}

// Handle removing favorites
favoritesContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-fav')) {
    const bookId = e.target.dataset.id;
    removeFavorite(bookId);
    renderFavorites(); // Refresh list
  }
});

// Render on load
renderFavorites();
