export function initCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartButton = document.querySelector(".basket-button");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartModal = document.querySelector(".cart-modal");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const cartClose = document.querySelector(".cart-close");

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartButton.textContent = `Кошик (${totalItems})`;
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <span class="cart-item-title">${item.title}</span>
        <span>${item.price}₴ × ${item.qty}</span>
        <button class="remove-btn" data-index="${index}" data-title="${item.title}">×</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `Разом: ${total}₴`;

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        const title = btn.dataset.title;
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();

        const card = document.querySelector(`.card[data-title="${title}"]`);
        if (card) {
          const addBtn = card.querySelector(".add-to-cart");
          if (addBtn) {
            addBtn.textContent = "Додати в кошик";
            addBtn.classList.remove("added");
          }
        }
      });
    });
  }

  function addToCart(product, btn) {
    const existing = cart.find((item) => item.title === product.title);
    if (existing) {
      existing.qty += 1;
      btn.textContent = `В кошику (${existing.qty})`;
    } else {
      cart.push({ ...product, qty: 1 });
      btn.textContent = `В кошику (1)`;
      btn.classList.add("added");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const product = {
        title: card.dataset.title,
        price: Number(card.dataset.price),
        img: card.dataset.img,
      };
      addToCart(product, btn);
    });
  });

  cartButton?.addEventListener("click", () => {
    cartModal.classList.add("active");
    renderCart();
  });
  cartClose?.addEventListener("click", () =>
    cartModal.classList.remove("active")
  );
  cartModal?.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.classList.remove("active");
  });

  updateCartCount();
}
