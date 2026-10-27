'use strict';
const siteRoot = new URL('../', document.currentScript.src);
const config = window.siteConfig || {};
function status(form, message) { form.querySelector('.form-status').textContent = message; }
let botpoisonLoading;
function loadBotpoison() {
  return botpoisonLoading ||= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@botpoison/browser';
    script.onload = () => resolve(window.Botpoison);
    script.onerror = () => { botpoisonLoading = null; script.remove(); reject(new Error('Unable to load spam protection.')); };
    document.head.append(script);
  });
}
const contact = document.querySelector('#contact-form');
contact?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contact.reportValidity()) return;
  if (!config.formsparkFormId || !config.botpoisonPublicKey) {
    status(contact, 'The contact form is not available yet. Please email info@anjagoder.com.');
    return;
  }
  const button = contact.querySelector('button');
  if (button.disabled) return;
  button.disabled = true; status(contact, 'Sending your message…');
  try {
    const Botpoison = await loadBotpoison();
    const { solution } = await new Botpoison({ publicKey: config.botpoisonPublicKey }).challenge();
    const response = await fetch('https://submit-form.com/' + encodeURIComponent(config.formsparkFormId), {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(contact)), _botpoison: solution }),
      signal: AbortSignal.timeout(30000)
    });
    if (!response.ok) throw new Error('Submission failed');
    contact.reset(); status(contact, 'Thank you. Your message has been sent.');
  } catch {
    status(contact, 'Your message could not be sent. Please try again or email info@anjagoder.com.');
  } finally { button.disabled = false; }
});
document.querySelectorAll('[data-newsletter]').forEach(form => {
  if (config.mailchimpAction) {
    try {
      const url = new URL(config.mailchimpAction);
      if (url.protocol === 'https:' && /\.list-manage\.com$/.test(url.hostname)) {
        form.action = url.href; form.target = '_blank'; form.rel = 'noopener noreferrer';
      }
    } catch { /* Leave unconfigured form safely disabled. */ }
  }
  form.addEventListener('submit', event => {
    if (form.getAttribute('action') === '#') {
      event.preventDefault(); status(form, 'Newsletter signup is not available yet. Please check back soon.');
    }
  });
});
// Keyboard access for the original menu and gallery controls.
document.querySelectorAll('a[href="javascript:void(0)"]').forEach(el => {
  el.setAttribute('role', 'button');
  if (!el.textContent.trim()) el.setAttribute('aria-label', /prev|left/.test(el.className) ? 'Previous image' : /next|right/.test(el.className) ? 'Next image' : 'Gallery control');
  el.addEventListener('keydown', event => { if (event.key === ' ') { event.preventDefault(); el.click(); } });
});
document.querySelectorAll('.liza_search_form').forEach(form => {
  form.querySelector('[onclick]')?.removeAttribute('onclick');
  form.querySelector('.liza_icon_search')?.addEventListener('click', () => form.requestSubmit());
});
const results = document.querySelector('#search-results');
if (results) {
  const query = new URLSearchParams(location.search).get('s')?.trim() || '';
  document.querySelector('#search-query').value = query;
  if (query) fetch(new URL('assets/search.json', siteRoot)).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(pages => {
    const matches = pages.filter(p => (p.title+' '+p.text).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    results.textContent = matches.length ? '' : 'No matching pages found.';
    for (const page of matches) {
      const item = document.createElement('p'); const link = document.createElement('a');
      link.href = new URL(page.url, siteRoot).href; link.textContent = page.title; item.append(link); results.append(item);
    }
  }).catch(() => { results.textContent = 'Search is unavailable. Please try again.'; });
}

// Accessible mobile disclosure navigation, with native button keyboard behavior.
const oldMobileToggle = document.querySelector('.liza_menu_toggler_mobile');
const mobilePanel = document.querySelector('.liza_mobile_menu_wrapper');
if (oldMobileToggle && mobilePanel) {
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = oldMobileToggle.className;
  toggle.innerHTML = '<span class="mobile-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="mobile-menu-label">Menu</span>';
  oldMobileToggle.replaceWith(toggle);
  mobilePanel.id = 'mobile-navigation';
  const social = mobilePanel.querySelector('.liza_social_icons_mobile');
  if (social) mobilePanel.append(social);
  toggle.setAttribute('aria-controls', mobilePanel.id);
  const nav = mobilePanel.querySelector('nav');
  nav?.setAttribute('aria-label', 'Main navigation');
  const header = toggle.closest('header');
  function setOpen(open, restoreFocus = false) {
    mobilePanel.hidden = !open;
    mobilePanel.classList.toggle('is-open', open);
    header.classList.toggle('liza_menu_opened', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.mobile-menu-label').textContent = open ? 'Close' : 'Menu';
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (restoreFocus) toggle.focus();
  }
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(mobilePanel.hidden));
  toggle.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault(); setOpen(true); nav?.querySelector('a')?.focus();
    }
  });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobilePanel.hidden) {
      event.preventDefault(); setOpen(false, true);
    }
  });
  mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  matchMedia('(max-width: 1200px)').addEventListener('change', () => setOpen(false));
}
