import { loadHeaderAuto, loadFooter } from "./layout.js";
import { setupDeliverySelectors } from "./delivery-ui.js";

loadHeaderAuto();
loadFooter();

const basketItemsContainer = document.getElementById("basket-items");
const basketTotal = document.getElementById("basket-total");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("order-form");
const summaryContainer = document.getElementById("order-summary");

// 🔢 Лічильник у хедері
function updateBasketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const count = basket.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("basket-count");
  if (countEl) countEl.textContent = count;
}

function renderBasket() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];

  if (basket.length === 0) {
    basketItemsContainer.innerHTML = "<p>Кошик порожній.</p>";
    basketTotal.textContent = "0₴";
    summaryContainer.innerHTML = "";
    updateBasketCount();
    return;
  }

  let total = 0;
  basketItemsContainer.innerHTML = basket
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="basket-item">
          <img src="${item.img}" alt="${item.title}" />
          <div class="basket-info">
            <h3>${item.title}</h3>
            <p>Кількість: ${item.quantity}</p>
            <p>Ціна: ${item.price}₴</p>
            <p>Сума: ${itemTotal}₴</p>
            <button class="remove-btn" data-id="${item.id}">Видалити</button>
          </div>
        </div>
      `;
    })
    .join("");

  basketTotal.textContent = `${total}₴`;
  renderOrderSummary(basket);
  updateBasketCount();
}

function renderOrderSummary(basket) {
  let total = 0;
  summaryContainer.innerHTML = basket
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="summary-item">
          <img src="${item.img}" alt="${item.title}" />
          <div class="summary-info">
            <h3>${item.title}</h3>
            <p>Кількість: ${item.quantity}</p>
            <p>Ціна: ${item.price}₴</p>
            <p>Сума: ${itemTotal}₴</p>
          </div>
        </div>
      `;
    })
    .join("");

  summaryContainer.innerHTML += `<div class="summary-total"><strong>Загальна сума: ${total}₴</strong></div>`;
}

basketItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket = basket.filter((item) => item.id !== id);
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket();
  }
});

checkoutBtn.addEventListener("click", () => {
  checkoutForm.style.display = "block";
  setupDeliverySelectors();
});

renderBasket();
