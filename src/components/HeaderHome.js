export function renderHeaderHome() {
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-container">
      <div class="top-header">
        <div class="contact">
          <span><a href="tel:+380970408988">+380 97 040 89 88</a></span>
        </div>
        <div class="socials">
          <a href="https://instagram.com/" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://t.me/" target="_blank" aria-label="Telegram">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="viber://chat?number=%2B380671234567" target="_blank" aria-label="Viber">
            <i class="fab fa-viber"></i>
          </a>
        </div>
      </div>
      <div class="bottom-header">
        <div class="logo-container">
          <a href="/pages/index.html">
            <i class="fa-solid fa-seedling logo-icon"></i>
            <span class="logo-title">Plantify</span>
          </a>
        </div>
        <button class="burger" aria-label="Відкрити меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="header-nav">
          <ul>
            <li><a href="/pages/catalog.html">Каталог</a></li>
            <li><a href="#about">Про нас</a></li>
            <li><a href="#contact">Контакти</a></li>
          </ul>
        </nav>
        <div class="header-info">
          <a href="/pages/cart.html" class="basket-button">
            <i class="fa-solid fa-shopping-basket"></i>
            <span class="basket-label">Кошик</span>
            <span id="cart-count">0</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  document.body.prepend(overlay);
  document.body.prepend(header);

  // Базова логіка бургер-меню
  const burger = header.querySelector(".burger");
  const nav = header.querySelector(".header-nav");
  const overlayEl = document.querySelector(".overlay");

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    overlayEl.classList.toggle("active");
  });

  overlayEl.addEventListener("click", () => {
    nav.classList.remove("open");
    overlayEl.classList.remove("active");
  });
}
