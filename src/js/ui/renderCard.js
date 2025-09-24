// Рендер однієї картки товару для каталогу
export function renderCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = product.id;
  card.dataset.title = product.name;
  card.dataset.price = product.price;
  card.dataset.img = product.image;

  card.innerHTML = `
    <div class="media">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <div class="row">
        <span class="price">${product.price} грн</span>
        <button class="card-btn add-to-cart">Додати в кошик</button>
        <a href="product.html?id=${product.id}" class="card-btn">Дізнатися більше</a>
      </div>
    </div>
  `;

  return card;
}
