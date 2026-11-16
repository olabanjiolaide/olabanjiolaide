(() => {
'use strict';
document.querySelectorAll('.copy-email').forEach(button => {
  const status = button.parentElement.querySelector('.copy-status');
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('olabanjiolaide@gmail.com');
      button.textContent = 'Copied!';
      status.textContent = 'Email address copied.';
    } catch {
      button.textContent = 'Copy email';
      status.textContent = 'Copy unavailable. Select the email address or use the email link.';
    }
  });
});
const dialog = document.querySelector('.snapshot-dialog');
if (!dialog || typeof dialog.showModal !== 'function') return;
const image = dialog.querySelector('img');
const original = dialog.querySelector('.snapshot-original');
const scroll = dialog.querySelector('.snapshot-scroll');
let trigger;
let overflow;
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    original.href = link.href;
    overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    scroll.scrollTop = 0;
    scroll.scrollLeft = 0;
    dialog.querySelector('.snapshot-close').focus();
  });
});
dialog.querySelector('.snapshot-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = overflow || '';
  if (trigger) trigger.focus({preventScroll:true});
});
})();
/* Restore deep-link position after initial fonts and images settle. Native links remain usable without JavaScript. */
(() => {
  if (!location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const initialHash = location.hash;
  let userMoved = false;
  const cancel = () => { userMoved = true; };
  const inputs = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
  inputs.forEach(type => window.addEventListener(type, cancel, { passive: true, once: true }));
  async function alignInitialTarget() {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      inputs.forEach(type => window.removeEventListener(type, cancel));
      if (userMoved || location.hash !== initialHash) return;
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      root.style.scrollBehavior = previous;
    }));
  }
  if (document.readyState === 'complete') alignInitialTarget();
  else window.addEventListener('load', alignInitialTarget, { once: true });
})();
