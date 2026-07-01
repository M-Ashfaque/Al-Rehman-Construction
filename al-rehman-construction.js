
// ── THEME TOGGLE ──
const html = document.documentElement;
const btn = document.getElementById('theme-toggle');
let dark = true;
function toggleTheme() {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  btn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('alrehman-theme', dark ? 'dark' : 'light');
}
const saved = localStorage.getItem('alrehman-theme');
if (saved === 'light') { dark = false; html.setAttribute('data-theme','light'); btn.textContent = '🌙'; }

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

// ── MOBILE MENU ──
function toggleMenu() { document.getElementById('mobile-nav').classList.toggle('open'); }

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ── COUNTERS ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (2000 / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    const sfx = el.closest('#counters') ? '+' : (el.dataset.target == 98 ? '%' : '+');
    el.textContent = Math.floor(cur) + sfx;
    if (cur >= target) clearInterval(t);
  }, 16);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.querySelectorAll('[data-target]').forEach(animateCounter); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#counters, #hero').forEach(el => counterObs.observe(el));

// ── FORM ──
function submitForm(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
