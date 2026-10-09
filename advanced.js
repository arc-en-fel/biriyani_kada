/* ==========================================================================
   BIRIYANI KADA — Advanced UI interactions
   File: advanced.js  (pairs with advanced.html + advanced.css)
   Pure progressive enhancement — the page content is unchanged.
   ========================================================================== */
'use strict';

/* ---------- Preloader ---------- */
const preloader = document.getElementById('preloader');
const hidePreloader = () => preloader && preloader.classList.add('done');
window.addEventListener('load', () => setTimeout(hidePreloader, 350));
setTimeout(hidePreloader, 4000); // safety fallback

/* ---------- Navbar scroll state & back-to-top visibility ---------- */
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');

const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    toTop.classList.toggle('show', y > 500);
    highlightNavLink();
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
});

// Close the mobile menu whenever a link is clicked
navLinks.forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}));

/* ---------- Active link highlighting on scroll ---------- */
const sections = ['home', 'menu', 'about', 'contact-heading']
    .map(id => document.getElementById(id))
    .filter(Boolean);

function highlightNavLink() {
    const pos = window.scrollY + 140;
    let currentId = sections.length ? sections[0].id : null;

    for (const sec of sections) {
        if (sec.offsetTop <= pos) currentId = sec.id;
    }
    // Reached the very bottom -> last section is active
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        currentId = sections.length ? sections[sections.length - 1].id : currentId;
    }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));
}

/* ---------- Live search filter for the menu ---------- */
const searchInput = document.getElementById('searchInput');
const dishCards = Array.from(document.querySelectorAll('.dish-card'));
const noResults = document.getElementById('noResults');

searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    let shown = 0;
    dishCards.forEach(card => {
        const hit = card.dataset.name.toLowerCase().includes(q);
        card.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
    });
    noResults.hidden = shown !== 0;
});

/* ---------- Scroll-reveal animations ---------- */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Animated hero counters ---------- */
const animateCount = el => {
    const target = Number(el.dataset.count) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(animateCount);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ---------- Order button toast ---------- */
const toast = document.getElementById('toast');
let toastTimer;

const showToast = html => {
    toast.innerHTML = html;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
};

document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('<strong>' + btn.dataset.dish + '</strong> — great choice! Call <strong>+91 99455 44547</strong> to place your order.');
    });
});

/* ---------- Back to top ---------- */
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Init ---------- */
onScroll();
