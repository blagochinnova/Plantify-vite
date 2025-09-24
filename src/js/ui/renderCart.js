// Рендер товару в кошику
export function renderCartItem(item) {
  const row = document.createElement("div");
  row.className = "cart-row";
  row.dataset.id = item.id;

  row.innerHTML = `
    <div class="cart-image">
      <img src="${item.image}" alt="${item.name}" />
    </div>
    <div class="cart-info">
      <h4>${item.name}</h4>
      <p>${item.price} грн × ${item.quantity}</p>
    </div>
    <div class="cart-actions">
      <button class="remove-item">Видалити</button>
    </div>
  `;

  return row;
}
