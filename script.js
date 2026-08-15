/* ============================================
   UMAIR PORTFOLIO - MAIN SCRIPT
   ============================================ */

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 500);
});

/* ===== DOM ELEMENTS ===== */
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const yearSpan = document.getElementById('year');

/* ===== TYPING EFFECT ===== */
const typingText = document.getElementById('typing-text');
const roles = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'React Developer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Start typing effect after preloader
setTimeout(typeEffect, 600);

/* ===== THEME TOGGLE ===== */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Check saved theme or use system preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'dark'); // Default to dark
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

/* ===== MOBILE MENU ===== */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ===== SCROLL EFFECTS ===== */
function handleScroll() {
    const scrollY = window.scrollY;

    // Header background on scroll
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Active nav link highlighting
    updateActiveNavLink();
}

window.addEventListener('scroll', handleScroll);

/* ===== ACTIVE NAV LINK ===== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ===== BACK TO TOP ===== */
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===== FOOTER YEAR ===== */
yearSpan.textContent = new Date().getFullYear();

/* ===== REVEAL ON SCROLL (Intersection Observer) ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== SKILL BARS ANIMATION ===== */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const progressFill = card.querySelector('.progress-fill');
            const percentElement = card.querySelector('.skill-percent');

            if (progressFill) {
                const width = progressFill.getAttribute('data-width');
                progressFill.style.width = width;
            }

            if (percentElement) {
                const target = parseInt(percentElement.getAttribute('data-target'));
                animateCounter(percentElement, 0, target, 1500);
            }

            skillObserver.unobserve(card);
        }
    });
}, {
    threshold: 0.5
});

skillCards.forEach(card => skillObserver.observe(card));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(start + (end - start) * easedProgress);

        element.textContent = current + '%';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ===== STATS COUNTERS ===== */
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));

            if (target >= 100) {
                // Format large numbers with commas
                animateLargeCounter(counter, 0, target, 2000);
            } else {
                animateStat(counter, 0, target, 2000);
            }

            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));

function animateStat(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easedProgress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function animateLargeCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easedProgress);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ===== CONTACT FORM VALIDATION ===== */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    // Validate Name
    if (name.value.trim().length < 2) {
        showError(name, 'Please enter your name (min 2 characters)');
        isValid = false;
    } else {
        clearError(name);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }

    // Validate Subject
    if (subject.value.trim().length < 3) {
        showError(subject, 'Please enter a subject (min 3 characters)');
        isValid = false;
    } else {
        clearError(subject);
    }

    // Validate Message
    if (message.value.trim().length < 10) {
        showError(message, 'Please enter your message (min 10 characters)');
        isValid = false;
    } else {
        clearError(message);
    }

    if (isValid) {
        handleFormSuccess();
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMsg = formGroup.querySelector('.error-msg');
    formGroup.classList.add('error');
    errorMsg.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
}

// Clear error on input
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
    });
});

function handleFormSuccess() {
    const formSuccess = document.getElementById('form-success');
    formSuccess.classList.add('show');

    // Simulate sending (since there's no backend)
    contactForm.reset();

    setTimeout(() => {
        formSuccess.classList.remove('show');
    }, 5000);
}

/* ===== INITIALIZE ON LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    handleScroll();
});