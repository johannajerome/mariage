document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });
});

