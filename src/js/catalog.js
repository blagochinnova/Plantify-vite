import { loadHeaderAuto, loadFooter } from "./layout.js";
import { renderCard } from "./card.js";

loadHeaderAuto();
loadFooter();

// Отримуємо параметри з URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Мапа назв категорій
const titleMap = {
  strawberry: "Полуниця",
  grapes: "Виноград",
  raspberry: "Малина",
  currant: "Смородина",
  blackberry: "Ожина",
};

// Завантаження товарів
fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.querySelector(".catalog-grid");
    const activeTitle = document.querySelector(".active-category-title");
    const showAllBtn = document.getElementById("show-all");

    if (!container) return;

    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;

    if (category && activeTitle) {
      activeTitle.textContent = `Категорія: ${titleMap[category] || category}`;
    }

    if (category && showAllBtn) {
      showAllBtn.style.display = "inline-block";
      showAllBtn.addEventListener("click", () => {
        activeTitle.textContent = "Всі товари";
        history.replaceState(null, "", "catalog.html");
        showAllBtn.style.display = "none";
        renderCatalog(products);
      });
    }

    renderCatalog(filtered);

    function renderCatalog(list) {
      container.innerHTML = "";
      list.forEach((product) => {
        const card = renderCard(product);
        container.appendChild(card);
      });
    }
  });
