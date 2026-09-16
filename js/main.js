// mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('site-nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// contact form -> mail app
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const lines = [...form.elements]
    .filter((el) => el.name)
    .map((el) => `【${el.name}】\n${el.value.trim() || '—'}`);
  const { subject, greeting } = form.dataset;
  const company = form.elements[0].value.trim();
  const body = `${greeting}\n\n${lines.join('\n\n')}\n`;
  location.href = `mailto:sales2@cnw2018.com?subject=${encodeURIComponent(`${subject}（${company}）`)}&body=${encodeURIComponent(body)}`;
});
