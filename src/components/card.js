// Ф-ція для створення HTML-картки товару
export function renderCard(product) {
  // Створюємо елемент <article> з класом "card"
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.category = product.category; // додаємо категорію для фільтрації

  // Вставляємо HTML-структуру картки
  card.innerHTML = `
    <div class="media">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <div class="row">
        <span class="price">${product.price} грн</span>
        <button class="card-btn add-to-cart" data-id="${product.id}">Додати в кошик</button>
        <button class="card-btn more-btn" data-id="${product.id}">Дізнатися більше</button>
      </div>
    </div>
  `;

  // Додаємо обробник кнопки "Дізнатися більше"
  const moreBtn = card.querySelector(".more-btn");
  moreBtn.addEventListener("click", () => {
    // Перехід на сторінку товару з параметром id
    window.location.href = `product.html?id=${product.id}`;
  });

  // Додаємо обробник кнопки "Додати в кошик"
  const cartBtn = card.querySelector(".add-to-cart");
  cartBtn.addEventListener("click", () => {
    // Отримуємо поточний кошик з localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Перевіряємо, чи товар вже є в кошику
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1; // збільшуємо кількість
    } else {
      cart.push({ ...product, quantity: 1 }); // додаємо новий товар
    }

    // Зберігаємо оновлений кошик
    localStorage.setItem("cart", JSON.stringify(cart));

    // TODO: можна показати модальне вікно "Товар додано"
    console.log(`Товар "${product.name}" додано в кошик`);
  });

  // Повертаємо готову картку
  return card;
}
