
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';


// changing bg-color on scroll for navbar

// index.js
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return; // safety check

  const inputs = navbar.querySelectorAll('input[type="text"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-gray-900', 'text-gray-200', 'shadow-xl');
      navbar.classList.remove('bg-white', 'text-gray-800');

      inputs.forEach(input => {
        input.classList.add('bg-gray-800', 'text-gray-200', 'placeholder-gray-400');
        input.classList.remove('bg-white', 'text-gray-800', 'placeholder-gray-500');
      });
    } else {
      navbar.classList.add('bg-white', 'text-gray-800');
      navbar.classList.remove('bg-gray-700', 'text-gray-200', 'shadow-xl');

      inputs.forEach(input => {
        input.classList.add('bg-white', 'text-gray-800', 'placeholder-gray-500');
        input.classList.remove('bg-gray-800', 'text-gray-200', 'placeholder-gray-400');
      });
    }
  });
}


