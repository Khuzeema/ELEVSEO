// site-enhancements.js

// Animate sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .card').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Toggle dark mode with emoji icon
const themeButton = document.getElementById('themeToggle');
themeButton?.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');
  themeButton.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Restore saved theme
const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  document.documentElement.classList.add('dark');
  themeButton && (themeButton.textContent = '☀️');
}

// Live character count for textareas
const textareas = document.querySelectorAll('textarea[data-count]');
textareas.forEach(textarea => {
  const counter = document.createElement('div');
  counter.className = 'char-counter';
  textarea.parentNode.insertBefore(counter, textarea.nextSibling);

  const updateCount = () => {
    const max = textarea.getAttribute('maxlength') || 500;
    counter.textContent = `${textarea.value.length}/${max}`;
  };

  textarea.addEventListener('input', updateCount);
  updateCount();
});

// Back-to-top button functionality
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';    
backToTop.textContent = '↑';
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(backToTop); 
// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});