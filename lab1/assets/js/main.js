// main.js
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { initNavbar } from './index.js';

initNavbar(); // navbar scroll effect


const bookContainer = document.getElementById('books-container');

// Event listener for Add to Favorite buttons
bookContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('fav-btn')) {
    const card = e.target.closest('.book-card');
    const book = {
      id: card.dataset.id,
      title: card.dataset.title,
      author: card.dataset.author,
      image: card.dataset.image,
      description: card.dataset.description
    };

    // Toggle favorite
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
      e.target.textContent = '🤍 Add to Favorites';
      e.target.classList.remove('bg-gray-400');
      e.target.classList.add('bg-red-500', 'hover:bg-red-600');
    } else {
      addFavorite(book);
      e.target.textContent = '❤️ Added to Favorites';
      e.target.classList.remove('bg-red-500', 'hover:bg-red-600');
      e.target.classList.add('bg-gray-400');
    }
  }
});
