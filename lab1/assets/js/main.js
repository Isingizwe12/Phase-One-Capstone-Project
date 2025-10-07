import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { initNavbar } from './index.js';

initNavbar(); // navbar scroll effect

const bookContainer = document.getElementById('books-container');

//  Fetch and render books from Open Library API
async function fetchBooks(query = 'javascript') {
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await res.json();
  const books = data.docs.slice(0, 20); // limit to 20 results

  bookContainer.innerHTML = ''; // clear previous

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl hover:scale-105';
    card.dataset.id = book.key; // unique id from API
    card.dataset.title = book.title;
    card.dataset.author = book.author_name ? book.author_name.join(', ') : 'Unknown';
    card.dataset.image = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'assets/images/library.jpg';
    card.dataset.description = book.first_sentence ? book.first_sentence.join(' ') : 'No description available.';

    card.innerHTML = `
      <img src="${card.dataset.image}" alt="${book.title}" class="h-48 w-full object-cover">
      <div class="p-4 flex-1 flex flex-col">
        <h3 class="text-lg font-semibold mb-1">${book.title}</h3>
        <p class="text-gray-600 text-sm mb-2">${card.dataset.author}</p>
        <p class="text-gray-700 text-sm flex-1">${card.dataset.description}</p>
        <button class="fav-btn mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition">
          🤍 Add to Favorites
        </button>
      </div>
    `;
    bookContainer.appendChild(card);
  });
}

// 2️⃣ Event listener for Add to Favorite buttons
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

//  Initial fetch
fetchBooks(); // default query
