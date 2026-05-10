/**
 * Main JavaScript File
 * Handles UI interactions, dark mode, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  updateActiveNavLink();
  initSlideshow();
});

/* -------------------------------------------------------------------------- */
/* Theme Toggle (Dark/Light Mode)                                             */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme, themeIcon);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

function updateThemeIcon(theme, iconElement) {
  if (!iconElement) return;
  // Using simple text or SVG update (SVG classes can be toggled)
  if (theme === 'dark') {
    iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`; // Sun icon for switching to light
  } else {
    iconElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`; // Moon icon for switching to dark
  }
}

/* -------------------------------------------------------------------------- */
/* Mobile Menu                                                                */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      
      // Update hamburger icon
      if (isExpanded) {
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      } else {
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Sticky Header                                                              */
/* -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Scroll Animations (Intersection Observer)                                  */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* Back to Top Button                                                         */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Active Navigation Link                                                     */
/* -------------------------------------------------------------------------- */
function updateActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === '/' && currentPath === '/') {
       link.classList.add('active');
    } else if (linkPath !== '/' && currentPath.includes(linkPath.replace('./', '').replace('.html',''))) {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Slideshow                                                                  */
/* -------------------------------------------------------------------------- */
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;
  
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  const dots = document.querySelectorAll('.dot');
  
  let currentSlide = 0;
  let slideInterval;
  
  function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      if (dots.length) dots[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if (dots.length) dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
      goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
      goToSlide(currentSlide - 1);
  }
  
  function startSlideshow() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
  }
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideshow();
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideshow();
  });
  
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          goToSlide(index);
          startSlideshow();
      });
  });
  
  startSlideshow();
}
