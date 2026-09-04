const revealItems = document.querySelectorAll('.reveal');

const activateReveal = () => {
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => {
      item.classList.add('in');
      item.querySelectorAll('.bar-fill, .mig-bar-fill').forEach((bar) => {
        if (bar.dataset.w) {
          bar.style.width = `${bar.dataset.w}%`;
        }
      });
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('in');
      entry.target.querySelectorAll('.bar-fill, .mig-bar-fill').forEach((bar) => {
        if (bar.dataset.w) {
          bar.style.width = `${bar.dataset.w}%`;
        }
      });

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', activateReveal);
} else {
  activateReveal();
}

let backToTopButton = document.querySelector('.back-to-top');
if (!backToTopButton) {
  backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.type = 'button';
  backToTopButton.setAttribute('aria-label', 'بازگشت به بالا');
  backToTopButton.textContent = '↑';
  document.body.appendChild(backToTopButton);
}

const toggleBackToTop = () => {
  backToTopButton.classList.toggle('show', window.scrollY > 320);
};

window.addEventListener('scroll', toggleBackToTop);
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
  const setMenuState = (isOpen) => {
    mobileMenu.classList.toggle('open', isOpen);
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  };

  navToggle.addEventListener('click', () => {
    setMenuState(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !navToggle.contains(event.target)) {
      setMenuState(false);
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setMenuState(false);
    }
  });
}
