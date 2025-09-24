export function renderFooter() {
  const footer = document.createElement("footer");
  footer.id = "contact";
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-content">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <i class="fa-solid fa-seedling logo-icon"></i>
            <h3>Plantify</h3>
          </div>
          <p>Натхнення природою. Якість у кожній рослині.</p>
        </div>
        <div class="footer-links">
          <h4>Меню</h4>
          <ul>
            <li><a href="/pages/index.html">Головна</a></li>
            <li><a href="/pages/catalog.html">Каталог</a></li>
            <li><a href="#about">Про нас</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Контакти</h4>
          <span><a href="tel:+380970408988">+380 97 040 89 88</a></span>
          <span><a href="mailto:info@plantify.com">info@plantify.com</a></span>
        </div>
        <div class="footer-social">
          <a href="https://instagram.com" target="_blank">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://t.me/username" target="_blank">
            <i class="fab fa-telegram fa-lg"></i>
          </a>
          <a href="viber://chat?number=+380XXXXXXXXX" target="_blank">
            <i class="fab fa-viber fa-lg"></i>
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Plantify Shop</p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}
