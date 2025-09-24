import { renderHeaderShop } from "../components/HeaderShop.js";
import { renderFooter } from "../components/Footer.js";
import { setupDeliverySelectors } from "../delivery-ui.js";
import { updateCartCount, getCart, saveCart } from "../cart/cart-utils.js";

// Рендер хедеру і футера
renderHeaderShop();
renderFooter();

// DOM-елементи
const basketItemsContainer = document.getElementById("basket-items");
const basketTotal = document.getElementById("basket-total");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("order-form");
const summaryContainer = document.getElementById("order-summary");

// Рендер кошика
function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    basketItemsContainer.innerHTML = "<p>Кошик порожній.</p>";
    basketTotal.textContent = "0₴";
    summaryContainer.innerHTML = "";
    updateCartCount();
    return;
  }

  let total = 0;

  basketItemsContainer.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="basket-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="basket-info">
            <h3>${item.name}</h3>
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
  renderOrderSummary(cart);
  updateCartCount();
}

// Рендер підсумку замовлення
function renderOrderSummary(cart) {
  let total = 0;

  summaryContainer.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="summary-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="summary-info">
            <h3>${item.name}</h3>
            <p>Кількість: ${item.quantity}</p>
            <p>Ціна: ${item.price}₴</p>
            <p>Сума: ${itemTotal}₴</p>
          </div>
        </div>
      `;
    })
    .join("");

  summaryContainer.innerHTML += `
    <div class="summary-total">
      <strong>Загальна сума: ${total}₴</strong>
    </div>
  `;
}

// Видалення товару з кошика
basketItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    let cart = getCart();
    cart = cart.filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
  }
});

// Відкриття форми оформлення
checkoutBtn.addEventListener("click", () => {
  checkoutForm.style.display = "block";
  setupDeliverySelectors();
});

// Ініціалізація
renderCart();
