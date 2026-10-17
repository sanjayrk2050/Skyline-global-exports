import logoHorizontal from '../assets/skyline-logo-horizontal.png';

export const initFooter = () => {
  const footerHTML = `
    <footer class="main-footer">
      <div class="container footer-container">
        <div class="footer-grid">
          <!-- Column 1: Brand & Mission -->
          <div class="footer-brand">
            <a href="/" class="footer-logo" aria-label="Skyline Global Exports">
              <img src="${logoHorizontal}" alt="Skyline Global Exports" class="footer-logo-img">
            </a>
            <p class="footer-tagline"><strong>Rooted in India. Ready for the World.</strong><br>Connecting Indian agricultural products with international markets through thoughtful sourcing and professional export coordination.</p>
            <div class="footer-badges">
              <span class="footer-badge">Indian Agriculture</span>
              <span class="footer-badge">Export Quality</span>
              <span class="footer-badge">Global Logistics</span>
            </div>
          </div>

          <!-- Column 2: Navigation / Explore -->
          <div class="footer-column">
            <h4 class="footer-col-title">Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/pages/about.html">About Us</a></li>
              <li><a href="/pages/products.html">Our Products</a></li>
              <li><a href="/pages/services.html">Our Services</a></li>
              <li><a href="/pages/contact.html">Contact Us</a></li>
            </ul>
          </div>

          <!-- Column 3: Our Products -->
          <div class="footer-column">
            <h4 class="footer-col-title">Our Products</h4>
            <ul>
              <li><a href="/pages/products.html#guntur-s4">Guntur Sannam (S4)</a></li>
              <li><a href="/pages/products.html#teja-s17">Teja (S17)</a></li>
              <li><a href="/pages/products.html#byadgi">Byadgi Red Chilli</a></li>
              <li><a href="/pages/products.html#devanur">Devanur Deluxe</a></li>
              <li><a href="/pages/products.html#powder-flakes">Chilli Powder &amp; Flakes</a></li>
            </ul>
          </div>

          <!-- Column 4: Let's Talk Business -->
          <div class="footer-column">
            <h4 class="footer-col-title">Let's Talk Business</h4>
            <div class="footer-details">
              <p class="detail-intro">Have a product requirement or export enquiry? We'd be happy to discuss your needs.</p>
              <p class="detail-line">
                <strong>Email:</strong> 
                <a href="mailto:skylineglobalexports5@gmail.com" class="footer-link">skylineglobalexports5@gmail.com</a>
              </p>
              <p class="detail-line">
                <strong>Main Contact:</strong> 
                <a href="tel:+919786412161" class="footer-link">+91 9786412161</a>
              </p>
              <p class="detail-line">
                <strong>Secondary Number:</strong> 
                <a href="tel:+916369563839" class="footer-link">+91 6369-563839</a>
              </p>
              <p class="detail-line">
                <strong>WhatsApp:</strong> 
                <a href="https://wa.me/919786412161" target="_blank" rel="noopener" class="footer-link">+91 9786412161</a>
              </p>
              <div class="footer-cta-wrapper" style="margin-top: 1rem;">
                <a href="/pages/contact.html" class="footer-cta">Request an Export Quote &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-copy">
            &copy; 2026 Skyline Global Export. All rights reserved.
          </div>
          <div class="footer-closing">
            Rooted in India. Ready for the World.
          </div>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
};
