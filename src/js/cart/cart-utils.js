// Отримання кошика з localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Збереження кошика в localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Оновлення лічильника товарів у хедері
export function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}
