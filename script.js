// Nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function openNav() {
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.classList.add('active');
  navLinks.classList.add('active');
  if (navBackdrop) navBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  if (navBackdrop) navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navLinks.classList.contains('active') ? closeNav() : openNav();
});

if (navBackdrop) {
  navBackdrop.addEventListener('click', closeNav);
}

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
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

// Page transition for internal links
document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="work.html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.target === '_blank' || link.getAttribute('href').startsWith('#')) return;
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.25s ease';
    setTimeout(() => window.location = link.href, 250);
  });
});

// Contact form (Web3Forms)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await res.json();

      if (data.success) {
        if (typeof gtag === 'function') {
          gtag('event', 'form_submit', { event_category: 'contact', event_label: 'portfolio_form' });
        }
        form.innerHTML = '<div class="form-status success" role="alert">Thanks! I\'ll be in touch within 24 hours.</div>';
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      btn.disabled = false;
      btn.textContent = originalText;
      const existing = form.querySelector('.form-status');
      if (existing) existing.remove();
      const status = document.createElement('div');
      status.className = 'form-status error';
      status.setAttribute('role', 'alert');
      status.textContent = 'Something went wrong. Please try email or WhatsApp.';
      form.appendChild(status);
      setTimeout(() => status.remove(), 5000);
    }
  });
}

// Track outbound link clicks
document.querySelectorAll('a[target="_blank"], a[href^="mailto:"], a[href^="https://wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'function') return;
    const href = link.getAttribute('href');
    let label = 'other';
    if (href.includes('linkedin.com')) label = 'linkedin';
    else if (href.includes('fiverr.com')) label = 'fiverr';
    else if (href.includes('github.com')) label = 'github';
    else if (href.includes('wa.me')) label = 'whatsapp';
    else if (href.includes('mailto:')) label = 'email';
    else if (href.includes('play.google.com')) label = 'play_store';
    else if (href.includes('apps.apple.com')) label = 'app_store';
    gtag('event', 'outbound_click', { event_category: 'engagement', event_label: label, link_url: href });
  });
});

