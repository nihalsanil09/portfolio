// === Theme Toggle with Animation and localStorage ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// Load theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme)) {
  setTheme(true);
} else {
  setTheme(false);
}

// Toggle dark/light mode with smooth transition
let themeTransitionTimeout;
themeToggle.addEventListener('click', () => {
  body.classList.add('theme-transition');
  clearTimeout(themeTransitionTimeout);
  setTimeout(() => body.classList.remove('theme-transition'), 600);
  const isDark = !body.classList.contains('dark-mode');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// === Smooth Scroll for Navigation ===
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Sticky Nav Active Section Highlight ===
function setActiveNav() {
  const scrollPos = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('resize', setActiveNav);
document.addEventListener('DOMContentLoaded', setActiveNav);

// === Section Fade-in Fallback for Users without AOS ===
if (!window.AOS) {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => {
    section.classList.add('invisible');
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector('#contact');
      if (target) {
        var header = document.querySelector('.header');
        var offset = header ? header.offsetHeight + 8 : 64;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  // Smooth scroll with offset for sticky navbar
  function scrollWithOffset(e, selector) {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      const header = document.querySelector('.header');
      const offset = header ? header.offsetHeight + 8 : 64;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
  
  // Add smooth scroll to all desktop nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', function(e) {
        scrollWithOffset(e, this.getAttribute('href'));
      });
    }
  });
  
  // Add smooth scroll to all mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', function(e) {
        scrollWithOffset(e, this.getAttribute('href'));
      });
    }
  });
  
  // Optional: Active state highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenuFn() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  hamburger.addEventListener('click', openMenu);
  closeMenu.addEventListener('click', closeMenuFn);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenuFn);
  });
  
  // Close menu on outside click
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMenuFn();
  });
}); 
