(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const progress = document.querySelector('.reading-progress');
  let pending = false;
  function updateNavigation() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ')';
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .4) current = section.id;
    }
    if (max > 0 && window.scrollY >= max - 4) current = sections.at(-1)?.id || '';
    for (const link of navLinks) {
      if (link.getAttribute('href') === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    pending = false;
  }
  function scheduleUpdate() {
    if (!pending) { pending = true; requestAnimationFrame(updateNavigation); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateNavigation();
  // Content stays visible with JavaScript unavailable or motion disabled.
  if ('IntersectionObserver' in window && Element.prototype.animate) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!reducedMotion.matches) {
          entry.target.animate([{ opacity: .2, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'cubic-bezier(.2,.65,.3,1)' });
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: .12 });
    document.querySelectorAll('.project').forEach(el => observer.observe(el));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
    });
  }
})();
/* Inspired by 0xUrvish's Bento Card on 21st.dev.
   Original vanilla JavaScript adaptation; no React runtime required. */
(() => {
  const controls = document.querySelector('.preview-controls');
  const screen = document.querySelector('#project-screen');
  const caption = document.querySelector('#preview-caption');
  const fullSize = document.querySelector('#preview-full');
  if (!controls || !screen || !caption) return;
  const root = 'https://raw.githubusercontent.com/olabanjiolaide/support-ticket-ai/main/docs/images/';
  const views = {
    workspace: { file: 'workspace-modern-light.png', alt: 'Support Ticket AI workspace for reviewing a model suggestion', caption: 'Workspace · Review a model suggestion before confirming a category.' },
    requests: { file: 'requests-overview.png', alt: 'Support Ticket AI saved requests overview', caption: 'All requests · Browse saved requests and their review status.' },
    resolved: { file: 'requests-resolved.png', alt: 'Support Ticket AI resolved requests view', caption: 'Resolved · Review requests marked as resolved.' }
  };
  const buttons = [...controls.querySelectorAll('button[data-view]')];
  let request = 0;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  controls.hidden = false;
  buttons.forEach(button => button.addEventListener('click', event => {
    const sequence = ++request;
    // Clicking the visible selection also cancels any pending switch.
    if (button.getAttribute('aria-pressed') === 'true') {
      screen.removeAttribute('aria-busy');
      caption.textContent = views[button.dataset.view].caption;
      return;
    }
    const view = views[button.dataset.view];
    caption.textContent = 'Loading preview…';
    screen.setAttribute('aria-busy', 'true');
    const image = new Image();
    image.onload = () => {
      if (sequence !== request) return;
      screen.src = image.src;
      screen.alt = view.alt;
      if (fullSize) fullSize.href = image.src;
      caption.textContent = view.caption;
      screen.removeAttribute('aria-busy');
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      if (screen.getAnimations) screen.getAnimations().forEach(animation => animation.cancel());
      if (event.detail !== 0 && !motion.matches && screen.animate) screen.animate([{opacity:.4,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'cubic-bezier(.23,1,.32,1)'});
    };
    image.onerror = () => {
      if (sequence !== request) return;
      screen.removeAttribute('aria-busy');
      caption.textContent = 'This preview could not load. The current screenshot is still available; explore the repository for more.';
    };
    image.src = root + view.file;
  }));
})();
