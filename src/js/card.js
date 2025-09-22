// Імпорт ф-ції, яка оновлює лічильник товарів у кошику
import { updateBasketCount } from "./layout.js";

// Створення HTML-картки товару
export function renderCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="media">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <div class="row">
        <span class="price">${product.price} грн</span>
        <button class="card-btn add-to-basket" data-id="${product.id}">Додати в кошик</button>
        <button class="card-btn more-btn" data-id="${product.id}">Дізнатися більше</button>
      </div>
    </div>
  `;
  // Обробник кнопки "Дізнатися більше" - переход на сторінку товару
  card.querySelector(".more-btn").addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });
  // Обробник кнопки "Додати в кошик"
  card.querySelector(".add-to-basket").addEventListener("click", () => {
    const basket = JSON.parse(localStorage.getItem("basket")) || [];

    // Перевірка товару в кошику
    const existing = basket.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      basket.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasketCount();

    card.querySelector(".add-to-basket").textContent = "В кошику";
    card.querySelector(".add-to-basket").classList.add("added");
  });

  return card;
}
