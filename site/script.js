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
          entry.target.animate([{ opacity: .2, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: .12 });
    document.querySelectorAll('.section-heading, .research-grid article, .project, .experience-row').forEach(el => observer.observe(el));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
    });
  }
})();