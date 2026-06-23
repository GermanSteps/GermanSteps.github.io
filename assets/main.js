// =============================================
// TARGEM — Language switcher & interactions
// =============================================

const LANG_CONFIG = {
  ar: { dir: 'rtl', htmlLang: 'ar', bodyClass: 'lang-ar', title: 'German Steps | كورسات اللغات — ألماني، إنجليزي، عربي' },
  de: { dir: 'ltr', htmlLang: 'de', bodyClass: 'lang-de', title: 'German Steps | Sprachkurse — Deutsch, Englisch, Arabisch' },
  en: { dir: 'ltr', htmlLang: 'en', bodyClass: 'lang-en', title: 'German Steps | Language Courses — German, English, Arabic' },
};

const FORM_PLACEHOLDERS = {
  ar: { name: 'أدخل اسمك الكامل', email: 'example@email.com' },
  de: { name: 'Vollständigen Namen eingeben', email: 'example@email.com' },
  en: { name: 'Enter your full name', email: 'example@email.com' },
};

const SELECT_OPTIONS = {
  ar: [
    { value: '', label: 'اختر الكورس' },
    { value: 'german', label: 'كورس الألمانية' },
    { value: 'english', label: 'كورس الإنجليزية' },
    { value: 'arabic', label: 'كورس العربية' },
    { value: 'other', label: 'أخرى' },
  ],
  de: [
    { value: '', label: 'Kurs wählen' },
    { value: 'german', label: 'Deutschkurs' },
    { value: 'english', label: 'Englischkurs' },
    { value: 'arabic', label: 'Arabischkurs' },
    { value: 'other', label: 'Sonstiges' },
  ],
  en: [
    { value: '', label: 'Select a course' },
    { value: 'german', label: 'German Course' },
    { value: 'english', label: 'English Course' },
    { value: 'arabic', label: 'Arabic Course' },
    { value: 'other', label: 'Other' },
  ],
};

let currentLang = 'ar';

function setLang(lang) {
  if (!LANG_CONFIG[lang]) return;
  currentLang = lang;

  const cfg = LANG_CONFIG[lang];
  const body = document.body;
  const html = document.documentElement;

  // Update html element
  html.lang = cfg.htmlLang;
  html.dir = cfg.dir;

  // Update page title
  document.title = cfg.title;

  // Update body
  body.dataset.lang = lang;
  body.className = cfg.bodyClass;

  // Toggle all t-XX spans
  ['ar', 'de', 'en'].forEach(l => {
    document.querySelectorAll(`.t-${l}`).forEach(el => {
      el.style.display = l === lang ? '' : 'none';
    });
  });

  // Toggle logo spans
  document.querySelectorAll('.logo-ar, .logo-de, .logo-en').forEach(el => {
    const cls = el.className.split(' ').find(c => c.startsWith('logo-'));
    if (cls) el.style.display = cls === `logo-${lang}` ? '' : 'none';
  });

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick') === `setLang('${lang}')`);
  });

  // Update select options
  const select = document.querySelector('.contact-form select');
  if (select) {
    const opts = SELECT_OPTIONS[lang];
    select.innerHTML = opts.map(o =>
      `<option value="${o.value}">${o.label}</option>`
    ).join('');
  }

  // Update form input placeholders
  const ph = FORM_PLACEHOLDERS[lang];
  const nameInput = document.querySelector('.contact-form input[type="text"]');
  const emailInput = document.querySelector('.contact-form input[type="email"]');
  if (nameInput) nameInput.placeholder = ph.name;
  if (emailInput) emailInput.placeholder = ph.email;

  // Close mobile menu if open
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.remove('open');
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.toggle('open');
}

function handleSubmit(e) {
  e.preventDefault();
  const successEl = document.getElementById('form-success');
  if (successEl) {
    // Show the correct language success message
    successEl.querySelectorAll('[class^="t-"]').forEach(el => {
      const cls = el.className;
      el.style.display = cls === `t-${currentLang}` ? '' : 'none';
    });
    successEl.style.display = 'block';
    e.target.reset();
    setTimeout(() => { successEl.style.display = 'none'; }, 4000);
  }
}

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      document.querySelector('.nav-links')?.classList.remove('open');
    }
  });
});

// Initialize with Arabic
setLang('ar');
