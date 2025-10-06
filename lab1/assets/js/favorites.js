// favorites.js
const FAVORITES_KEY = "favoriteBooks";

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveFavorites(list) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export function addFavorite(book) {
  const id = String(book.id);
  const list = getFavorites();
  if (!list.some(b => String(b.id) === id)) {
    // Ensure id is a string to avoid type mismatch
    list.push({...book, id});
    saveFavorites(list);
  }
}

export function removeFavorite(bookId) {
  const id = String(bookId);
  const list = getFavorites().filter(b => String(b.id) !== id);
  saveFavorites(list);
}

export function isFavorite(bookId) {
  const id = String(bookId);
  return getFavorites().some(b => String(b.id) === id);
}

export function clearFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}
