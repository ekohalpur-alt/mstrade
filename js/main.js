/**
 * Main JavaScript File
 * Handles UI interactions, dark mode, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initDropdowns();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  updateActiveNavLink();
  initSlideshow();
  initKvaCalculator();
  initSolutionAssistant();
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
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Dropdown Menu (click-based for touch/mobile)                               */
/* -------------------------------------------------------------------------- */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (!btn || !content) return;

    // Prevent href="#" from scrolling to top
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Close all other dropdowns first
      dropdowns.forEach(d => {
        if (d !== dropdown) {
          const c = d.querySelector('.dropdown-content');
          if (c) c.classList.remove('dropdown-open');
          const b = d.querySelector('.dropdown-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this one
      const isOpen = content.classList.toggle('dropdown-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  // Close all dropdowns when clicking outside nav
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => {
        const c = d.querySelector('.dropdown-content');
        if (c) c.classList.remove('dropdown-open');
        const b = d.querySelector('.dropdown-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdowns when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => {
        const c = d.querySelector('.dropdown-content');
        if (c) c.classList.remove('dropdown-open');
        const b = d.querySelector('.dropdown-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
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
  // Works for both file:// (local) and http:// (server) paths
  const pathParts = window.location.pathname.split('/');
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-btn)');
  navLinks.forEach(link => {
    // Remove active class first
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    const linkParts = href.split('/');
    const linkFile = linkParts[linkParts.length - 1].split('?')[0];
    
    // Match current page
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
    // Handle root/index index matching
    if ((currentFile === '' || currentFile === 'index.html') && linkFile === 'index.html') {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Slideshow                                                                  */
/* -------------------------------------------------------------------------- */
function initSlideshow() {
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach(slideshow => {
      const slides = slideshow.querySelectorAll('.slide');
      if (slides.length === 0) return;
      
      const prevBtn = slideshow.querySelector('.slide-btn.prev');
      const nextBtn = slideshow.querySelector('.slide-btn.next');
      const dots = slideshow.querySelectorAll('.dot');
      
      let currentSlide = 0;
      let slideInterval;
      
      function goToSlide(n) {
          slides[currentSlide].classList.remove('active');
          if (dots.length > currentSlide) dots[currentSlide].classList.remove('active');
          
          currentSlide = (n + slides.length) % slides.length;
          
          slides[currentSlide].classList.add('active');
          if (dots.length > currentSlide) dots[currentSlide].classList.add('active');
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
  });
}

// Modal Functions
window.openModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'block';
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'none';
}

// Close modal if user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('custom-modal')) {
        event.target.style.display = 'none';
    }
});

/* -------------------------------------------------------------------------- */
/* Generator kVA Calculator                                                  */
/* -------------------------------------------------------------------------- */
const APPLIANCES = {
  ac: { name: "Air Conditioner (1.5 Ton)", running: 1800, starting: 3600 },
  fridge: { name: "Refrigerator / Freezer", running: 400, starting: 1200 },
  pump: { name: "Water Pump (1 HP)", running: 750, starting: 2200 },
  lights: { name: "Lighting & Fans", running: 300, starting: 300 },
  computer: { name: "Desktop Computer", running: 250, starting: 250 },
  heater: { name: "Water Heater / Geyser", running: 2000, starting: 2000 },
  lift: { name: "Elevator / Lift (Small)", running: 7500, starting: 15000 },
  machinery: { name: "Heavy Machinery / Motor", running: 15000, starting: 30000 }
};

function initKvaCalculator() {
  const calcContainer = document.querySelector('.calculator-card');
  if (!calcContainer) return;

  // Set up click listeners for all quantity control buttons
  const qtyBtns = calcContainer.querySelectorAll('.qty-btn');
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const action = btn.getAttribute('data-action');
      const valSpan = document.getElementById(`qty-${type}`);
      if (!valSpan) return;

      let val = parseInt(valSpan.textContent) || 0;
      if (action === 'plus') {
        val = Math.min(val + 1, 99);
      } else if (action === 'minus') {
        val = Math.max(val - 1, 0);
      }
      valSpan.textContent = val;
      calculateKva();
    });
  });

  // Run initial calculation
  calculateKva();
}

function calculateKva() {
  let totalRunning = 0;
  let maxSurgeOverhead = 0;

  for (const key in APPLIANCES) {
    const qtySpan = document.getElementById(`qty-${key}`);
    if (!qtySpan) continue;
    const qty = parseInt(qtySpan.textContent) || 0;
    if (qty > 0) {
      totalRunning += APPLIANCES[key].running * qty;
      const surge = APPLIANCES[key].starting - APPLIANCES[key].running;
      if (surge > maxSurgeOverhead) {
        maxSurgeOverhead = surge;
      }
    }
  }

  const totalStarting = totalRunning + maxSurgeOverhead;
  let recommendedKva = 0;
  if (totalStarting > 0) {
    // Power factor 0.8, with 25% safety headroom (running load ideally at 80% capacity)
    recommendedKva = (totalStarting / 1000) / 0.8 * 1.25;
    recommendedKva = Math.round(recommendedKva * 10) / 10;
  }

  // Update dial
  const kvaVal = document.getElementById('calc-kva-value');
  if (kvaVal) kvaVal.textContent = recommendedKva > 0 ? recommendedKva : '0';

  const dial = document.getElementById('calc-dial');
  if (dial) {
    const percentage = Math.min((recommendedKva / 62.5) * 100, 100);
    dial.style.background = `radial-gradient(circle, var(--bg-primary) 55%, transparent 56%), conic-gradient(var(--accent-primary) 0% ${percentage}%, var(--border-color) ${percentage}% 100%)`;
  }

  // Update description text
  const resultText = document.getElementById('calc-result-text');
  if (resultText) {
    if (recommendedKva === 0) {
      resultText.textContent = "Select appliances to estimate";
    } else if (recommendedKva <= 5) {
      resultText.textContent = "Recommended: 5 kVA Compact Backup";
    } else if (recommendedKva <= 15) {
      resultText.textContent = "Recommended: 15 kVA Residential/Office";
    } else if (recommendedKva <= 30) {
      resultText.textContent = "Recommended: 30 kVA Heavy Commercial";
    } else if (recommendedKva <= 62.5) {
      resultText.textContent = "Recommended: 62.5 kVA Mini-Industrial";
    } else {
      resultText.textContent = "Recommended: 125+ kVA Heavy-Duty Custom";
    }
  }

  // Update quote button link
  const quoteBtn = document.getElementById('calc-quote-btn');
  if (quoteBtn) {
    quoteBtn.href = `contact.html?kva=${recommendedKva}`;
  }
}

/* -------------------------------------------------------------------------- */
/* Solution Assistant Chatbot                                                 */
/* -------------------------------------------------------------------------- */
const CHAT_FLOW = {
  start: {
    text: "Hello! I am your virtual solution assistant. What type of industrial solution or equipment are you looking for today?",
    options: [
      { text: "⚡ Power & Backup (Gensets)", next: "power" },
      { text: "🏢 Elevators & Lifts", next: "lifts" },
      { text: "🚜 Water & Agriculture", next: "water_agri" },
      { text: "🛠️ Service & Helpline", next: "support" }
    ]
  },
  power: {
    text: "M.S. Trade provides world-class Kirloskar Powergen systems. Which option fits your requirement best?",
    options: [
      { text: "🏡 Residential / Office Backup", next: "power_res" },
      { text: "🏭 Heavy Industrial Power", next: "power_ind" },
      { text: "📊 Calculate kVA size", action: "calc" },
      { text: "⬅️ Go Back", next: "start" }
    ]
  },
  power_res: {
    text: "For residential and standard offices, we recommend 5kVA to 15kVA gensets. Would you like a direct quote?",
    options: [
      { text: "💬 Request 10 kVA Quote", action: "quote_10kva" },
      { text: "💬 Request 15 kVA Quote", action: "quote_15kva" },
      { text: "⬅️ Go Back", next: "power" }
    ]
  },
  power_ind: {
    text: "We provide high-power CPCB IV+ compliant commercial gensets. Would you like to connect with a power engineer?",
    options: [
      { text: "📞 Connect via WhatsApp", action: "whatsapp_power" },
      { text: "⬅️ Go Back", next: "power" }
    ]
  },
  lifts: {
    text: "We offer Japanese precision Fuji elevators and heavy-duty EPIC lifting systems. What type of project is this for?",
    options: [
      { text: "🏢 Passenger / Luxury Elevators (Fuji)", next: "lift_fuji" },
      { text: "📦 Freight / Heavy Lift (EPIC)", next: "lift_epic" },
      { text: "⬅️ Go Back", next: "start" }
    ]
  },
  lift_fuji: {
    text: "Fuji passenger elevators feature ultra-smooth rides and sleek glass designs. Would you like to request a brochure or consultation?",
    options: [
      { text: "💬 Get Consultation Quote", action: "quote_fuji" },
      { text: "⬅️ Go Back", next: "lifts" }
    ]
  },
  lift_epic: {
    text: "EPIC heavy-duty lifts are perfect for warehouses, factories, and hospitals. Would you like to inquire?",
    options: [
      { text: "💬 Inquire about EPIC Lift", action: "quote_epic" },
      { text: "⬅️ Go Back", next: "lifts" }
    ]
  },
  water_agri: {
    text: "We provide diesel pumping systems, agricultural power tillers, weeders, and organic waste composters. What do you need?",
    options: [
      { text: "💧 Pumping & Flow Solutions", action: "quote_water" },
      { text: "🌾 Farming Mechanics", action: "quote_farm" },
      { text: "🌱 Organic Waste / I-Land", action: "quote_waste" },
      { text: "⬅️ Go Back", next: "start" }
    ]
  },
  support: {
    text: "Need quick help? You can connect with our 24/7 dedicated support engineers directly.",
    options: [
      { text: "📞 Call Support (9802542122)", action: "call_support" },
      { text: "🔧 Request AMC Maintenance", action: "quote_amc" },
      { text: "⬅️ Go Back", next: "start" }
    ]
  }
};

function initSolutionAssistant() {
  // Check if assistant widget container exists. If not, we will inject it.
  let widget = document.getElementById('assistant-widget');
  if (!widget) {
    widget = document.createElement('div');
    widget.id = 'assistant-widget';
    widget.className = 'assistant-widget animate-on-scroll fade-in-up';
    widget.innerHTML = `
      <button id="assistant-toggle" class="assistant-toggle" aria-label="Toggle Assistant">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <div id="assistant-window" class="assistant-window">
        <div class="assistant-header">
          <div class="assistant-header-avatar">MS</div>
          <div class="assistant-header-title">
            <h4>M.S. Trade Assistant</h4>
            <span>Virtual solution guide</span>
          </div>
        </div>
        <div id="assistant-chat-body" class="assistant-body"></div>
        <div class="assistant-footer">
          Powered by M.S.Trade International
        </div>
      </div>
    `;
    document.body.appendChild(widget);
  }

  const toggle = document.getElementById('assistant-toggle');
  const windowEl = document.getElementById('assistant-window');
  
  if (toggle && windowEl) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      windowEl.classList.toggle('active');
      
      // If opening for the first time, load start messages
      const chatBody = document.getElementById('assistant-chat-body');
      if (windowEl.classList.contains('active') && chatBody.children.length === 0) {
        loadChatState('start');
      }
    });
  }
}

function loadChatState(stateKey) {
  const chatBody = document.getElementById('assistant-chat-body');
  if (!chatBody) return;

  const stateObj = CHAT_FLOW[stateKey];
  if (!stateObj) return;

  // Append Bot Message
  appendChatMessage(stateObj.text, 'bot');

  // Append Options
  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'chat-options';
  
  stateObj.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      // Append User message
      appendChatMessage(opt.text, 'user');
      
      // Remove all option buttons in this container to prevent double clicking
      optionsDiv.innerHTML = '';
      
      // Check for actions
      if (opt.action) {
        handleChatAction(opt.action);
      } else if (opt.next) {
        setTimeout(() => {
          loadChatState(opt.next);
        }, 600);
      }
    });
    optionsDiv.appendChild(btn);
  });

  chatBody.appendChild(optionsDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendChatMessage(text, sender) {
  const chatBody = document.getElementById('assistant-chat-body');
  if (!chatBody) return;

  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChatAction(action) {
  const chatBody = document.getElementById('assistant-chat-body');
  if (!chatBody) return;

  let replyText = "";
  let redirectUrl = "";
  
  switch(action) {
    case 'calc':
      replyText = "Sure! Let's size your generator. I'll open our Generator Sizing Calculator for you.";
      appendChatMessage(replyText, 'bot');
      setTimeout(() => {
        // Toggle assistant off and scroll to calculator
        document.getElementById('assistant-window').classList.remove('active');
        document.getElementById('assistant-toggle').classList.remove('active');
        const calcCard = document.querySelector('.calculator-card');
        if (calcCard) {
          calcCard.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If on another page, go to index.html with section anchor
          window.location.href = "index.html#kva-calculator";
        }
      }, 1000);
      break;
    case 'quote_10kva':
      redirectUrl = "contact.html?kva=10";
      break;
    case 'quote_15kva':
      redirectUrl = "contact.html?kva=15";
      break;
    case 'quote_fuji':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I would like to inquire about Fuji Passenger Elevators for my project.");
      break;
    case 'quote_epic':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I would like to inquire about EPIC Heavy-Duty Lift systems.");
      break;
    case 'quote_water':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I am interested in Water Pumping and Flow solutions.");
      break;
    case 'quote_farm':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I would like information on Farm Mechanization equipment (Tillers/Weeders).");
      break;
    case 'quote_waste':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I would like information on Organic Waste solutions and composting.");
      break;
    case 'quote_amc':
      redirectUrl = "contact.html?details=" + encodeURIComponent("I want to request an AMC contract for Kirloskar generators/lifts.");
      break;
    case 'whatsapp_power':
      window.open("https://wa.me/9779858020148?text=Hello M.S.Trade! I would like to speak with a power engineer regarding heavy industrial generator systems.", "_blank");
      break;
    case 'call_support':
      window.location.href = "tel:9802542122";
      break;
    default:
      replyText = "Routing you to our contact page...";
      redirectUrl = "contact.html";
  }

  if (redirectUrl) {
    appendChatMessage("Redirecting you to our Quote Enquiry system...", 'bot');
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }
}
