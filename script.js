// Nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.highlight-card, .about-layout, .project, .exp-item, .contact-layout, .more-work, .testimonial-card, .testimonial-summary, .faq-item'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

// Add stagger class to grid parents
document.querySelectorAll('.highlights-grid, .testimonial-grid').forEach(grid => {
  grid.classList.add('stagger-children');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// Section labels slide-in
const labels = document.querySelectorAll('.section-label');
const labelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      labelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

labels.forEach(el => labelObserver.observe(el));

// Skill strip infinite scroll
const strip = document.querySelector('.strip-scroll');
if (strip) {
  // Duplicate content for seamless loop
  strip.innerHTML += strip.innerHTML;
  strip.classList.add('animate');
}

// Content protection
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 's')) {
    e.preventDefault();
  }
});

document.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', 'false');
  img.addEventListener('dragstart', e => e.preventDefault());
});
