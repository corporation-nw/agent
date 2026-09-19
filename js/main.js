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
const status = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');
const isZh = document.documentElement.lang.startsWith('zh');
const MSG = isZh
  ? { sending: '傳送中…', ok: '已送出，感謝您的洽詢。我們會在 3 個工作天內與您聯繫。',
      ng: '傳送失敗。請稍後再試，或直接寄信至 sales2@cnw2018.com。' }
  : { sending: '送信中…', ok: 'お問い合わせを受け付けました。3営業日以内にご連絡します。',
      ng: '送信できませんでした。時間をおいて試すか、sales2@cnw2018.com へ直接お送りください。' };

function show(text, state) {
  status.textContent = text;
  status.dataset.state = state;
  status.hidden = false;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  submitBtn.disabled = true;
  show(MSG.sending, 'sending');
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(String(res.status));
    form.reset();
    show(MSG.ok, 'ok');
  } catch (err) {
    submitBtn.disabled = false;
    show(MSG.ng, 'ng');
  }
});
