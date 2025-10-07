import { fetchBooks } from './fetchApi.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { initNavbar } from './index.js';

initNavbar();

const bookContainer = document.getElementById('books-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Render books based on query
async function renderBooks(query = 'javascript') {
  const feedback = document.getElementById('feedback-message');
  const bookContainer = document.getElementById('books-container');

  // Step 1: Show loading message
  feedback.innerHTML = `<div class="flex justify-center items-center gap-2 text-gray-500">
      <span class="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-6 h-6"></span>
      Loading books...
    </div>`;
  bookContainer.innerHTML = '';

  try {
    // Step 2: Fetch books
    const books = await fetchBooks(query);

    // Step 3: Check if results are empty
    if (books.length === 0) {
      feedback.innerHTML = `<p class="text-gray-600">No results found for "<strong>${query}</strong>"</p>`;
      return;
    }

    // Step 4: Clear feedback if results found
    feedback.textContent = '';

    // Step 5: Render books
    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl hover:scale-105';
      card.dataset.id = book.id;
      card.dataset.title = book.title;
      card.dataset.author = book.author;
      card.dataset.image = book.image;
      card.dataset.description = book.description;

      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="h-48 w-full object-cover">
        <div class="p-4 flex-1 flex flex-col">
          <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
          <p class="text-gray-600 text-sm mb-2">${book.author}</p>
          <p class="text-gray-700 text-sm flex-1">${book.description}</p>
          <button class="fav-btn mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition">
            🤍 Add to Favorites
          </button>
        </div>
      `;
      bookContainer.appendChild(card);
    });
  } catch (error) {
    feedback.innerHTML = `<p class="text-red-500">Error fetching books. Please try again.</p>`;
  }
}


// Search form submit
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) renderBooks(query); 
});

renderBooks(); 
