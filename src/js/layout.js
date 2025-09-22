export function loadHeaderAuto() {
  const path = window.location.pathname;

  const isHome = path.endsWith("index.html") || path === "/";
  const type = isHome ? "home" : "shop";

  const headerClass = {
    home: "site-header",
    shop: "shop-header",
  }[type];

  if (!document.querySelector(`.${headerClass}`)) {
    fetch(`/src/components/header-${type}.html`)
      .then((res) => res.text())
      .then((html) => {
        if (html.includes("<main")) {
          console.warn(`❌ У header-${type}.html є <main> — перевір компонент`);
          return;
        }
        document.body.insertAdjacentHTML("afterbegin", html);
        document.body.classList.add("with-header");
        updateBasketCount();
      });
  }
}

export function loadFooter() {
  if (!document.querySelector("footer")) {
    fetch("/src/components/footer.html")
      .then((res) => res.text())
      .then((html) => {
        document.body.insertAdjacentHTML("beforeend", html);
      });
  }
}
export function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const count = basket.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("basket-count");
  if (countEl) countEl.textContent = count;
}
