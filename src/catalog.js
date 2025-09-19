import { renderCard } from "./components/card.js";

//Для отримання параметрів з URL, ?category=strawberry
const params = new URLSearchParams(window.location.search);
const category = params.get("category"); //Витягнути значення категорії

//Мапа для відображення назв категорії
const titleMap = {
  strawberry: "Полуниця",
  grapes: "Виноград",
  raspberry: "Малина",
  currant: "Смородина",
  blackberry: "Ожина",
};

fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.querySelector(".catalog-grid");
    const activeTitle = document.querySelector(".active-category-title");
    const showAllBtn = document.getElementById("show-all");

    // Фільтруємо товари за категорією, якщо вона є
    const filtered = category
      ? products.filter((p) => p.category === category)
      : products;

    // Оновлюємо заголовок категорії
    if (category && activeTitle) {
      activeTitle.textContent = `Категорія: ${titleMap[category] || category}`;
    }

    // Показуємо кнопку "Всі товари", якщо є категорія
    if (category && showAllBtn) {
      showAllBtn.style.display = "inline-block";
      showAllBtn.addEventListener("click", () => {
        activeTitle.textContent = "Всі товари";
        history.replaceState(null, "", "catalog.html");
        showAllBtn.style.display = "none";

        container.innerHTML = "";
        products.forEach((product) => {
          const card = renderCard(product);
          container.appendChild(card);
        });
      });
    }

    // Рендеримо картки товарів
    filtered.forEach((product) => {
      const card = renderCard(product);
      container.appendChild(card);
    });
  });
