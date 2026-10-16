import logoHorizontal from '../assets/skyline-logo-horizontal.png';
import logoVertical from '../assets/skyline-logo-vertical.png';

export const initNavbar = () => {
  let nav = document.querySelector('.main-nav');

  if (!nav) {
    const navHTML = `
      <nav class="main-nav">
        <div class="nav-container">
          <div class="nav-logo">
            <a href="/" class="logo-brand" aria-label="Skyline Global Exports - Return to Homepage">
              <img src="${logoHorizontal}" alt="Skyline Global Exports" class="nav-logo-img">
            </a>
          </div>
          <div class="nav-links">
            <a href="/" class="nav-link" data-active="home">Home</a>
            <a href="/pages/about.html" class="nav-link" data-active="about">About Us</a>
            <a href="/pages/products.html" class="nav-link" data-active="products">Products</a>
            <a href="/pages/services.html" class="nav-link" data-active="services">Services</a>
            <a href="/pages/contact.html" class="nav-link" data-active="contact">Contact Us</a>
          </div>
          <div class="nav-cta">
            <a href="/pages/contact.html" class="contact-cta">Request a Quote</a>
          </div>
          <div class="mobile-toggle" aria-label="Toggle navigation" role="button" tabindex="0">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="mobile-menu">
          <div class="mobile-menu-inner">
            <button class="mobile-close-btn" aria-label="Close menu">&times;</button>
            <div class="mobile-logo" style="margin-bottom: 2rem;">
              <a href="/" aria-label="Skyline Global Exports">
                <img src="${logoVertical}" alt="Skyline Global Exports" style="height: 110px; width: auto; margin: 0 auto; display: block;">
              </a>
            </div>
            <div class="mobile-links">
              <a href="/" class="mobile-link">Home</a>
              <a href="/pages/about.html" class="mobile-link">About Us</a>
              <a href="/pages/products.html" class="mobile-link">Products</a>
              <a href="/pages/services.html" class="mobile-link">Services</a>
              <a href="/pages/contact.html" class="mobile-link">Contact Us</a>
            </div>
            <div class="mobile-cta">
              <a href="/pages/contact.html" class="contact-cta-large" style="width: 100%; justify-content: center;">Request a Quote</a>
            </div>
            <div class="mobile-footer" style="color: #A9B8A2; margin-top: 2rem;">
              <p>&copy; 2026 Skyline Global Exports. All rights reserved.</p>
            </div>
          </div>
        </div>
      </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    nav = document.querySelector('.main-nav');
  }

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const toggleMenu = () => {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('open');
    if (mobileToggle) mobileToggle.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMenu);
    mobileToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.mobile-link, .mobile-cta a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const currentPath = window.location.pathname.replace(/\\/g, '/').replace(/\/index\.html$/, '/') || '/';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '/' && href === '/') ||
      (href !== '/' && currentPath.endsWith(href))
    ) {
      link.classList.add('active');
    }
  });
};
