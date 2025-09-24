import { renderHeaderShop } from "../components/HeaderShop.js";
import { renderFooter } from "../components/Footer.js";
import { renderCard } from "../js/ui/renderCard.js";
import { getProducts } from "../js/api/product.js";

// Рендер хедеру і футера
renderHeaderShop();
renderFooter();

// Отримання параметра категорії з URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Мапа назв категорій для відображення
const titleMap = {
  strawberry: "Полуниця",
  grapes: "Виноград",
  raspberry: "Малина",
  currant: "Смородина",
  blackberry: "Ожина",
};

// DOM-елементи
const container = document.querySelector(".catalog-grid");
const activeTitle = document.querySelector(".active-category-title");
const showAllBtn = document.getElementById("show-all");

// Завантаження товарів
getProducts()
  .then((products) => {
    // Якщо контейнер не знайдено — припинити виконання
    if (!container) return;

    // Фільтрація за категорією, якщо вона задана
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;

    // Відображення назви активної категорії
    if (category && activeTitle) {
      activeTitle.textContent = `Категорія: ${titleMap[category] || category}`;
    }

    // Кнопка "Показати всі"
    if (category && showAllBtn) {
      showAllBtn.style.display = "inline-block";
      showAllBtn.addEventListener("click", () => {
        activeTitle.textContent = "Всі товари";
        history.replaceState(null, "", "catalog.html");
        showAllBtn.style.display = "none";
        renderCatalog(products);
      });
    }

    // Рендер каталогу
    renderCatalog(filtered);
  })
  .catch((err) => {
    console.error("Помилка при завантаженні товарів:", err);
  });

// Функція рендеру списку товарів
function renderCatalog(list) {
  container.innerHTML = "";
  list.forEach((product) => {
    const card = renderCard(product);
    container.appendChild(card);
  });
}
