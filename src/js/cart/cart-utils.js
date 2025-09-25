// Отримання кошика з localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Збереження кошика в localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Додавання товару до кошика
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
}
// Оновлення лічильника товарів у хедері
export function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}
