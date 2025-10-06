
// changing bg-color on scroll for navbar

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const inputs = navbar.querySelectorAll('input[type="text"]'); // select all text inputs in navbar

    if (window.scrollY > 50) {
      // Dark mode
      navbar.classList.add('bg-gray-900', 'text-gray-200', 'shadow-xl');
      navbar.classList.remove('bg-white', 'text-gray-800');

      // Update input styles
      inputs.forEach(input => {
        input.classList.add('bg-gray-800', 'text-gray-200', 'placeholder-gray-400');
        input.classList.remove('bg-white', 'text-gray-800', 'placeholder-gray-500');
      });

    } else {
      // Light mode
      navbar.classList.add('bg-white', 'text-gray-800');
      navbar.classList.remove('bg-gray-700', 'text-gray-200', 'shadow-xl');

      // Revert input styles
      inputs.forEach(input => {
        input.classList.add('bg-white', 'text-gray-800', 'placeholder-gray-500');
        input.classList.remove('bg-gray-800', 'text-gray-200', 'placeholder-gray-400');
      });
    }
  });

let addFav=document.getElementById("add-fav");
addFav.addEventListener('click',function(){
  alert('button clicked');
})