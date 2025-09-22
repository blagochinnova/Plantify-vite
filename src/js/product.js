import { loadHeaderAuto, loadFooter } from "./layout.js";

loadHeaderAuto();
loadFooter();
// Ініціалізація кошика
function initCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.textContent = count;
}

// Отримуємо ID товару з URL
const params = new URLSearchParams(location.search);
const productId = params.get("id");

//  DOM-елементи
const titleEl = document.getElementById("product-title");
const imageEl = document.getElementById("product-image");
const descriptionEl = document.getElementById("product-description");
const priceEl = document.getElementById("product-price");
const stateEl = document.getElementById("product-state");
const quantityEl = document.getElementById("quantity");
const thumbsContainer = document.querySelector(".carousel-thumbs");
const carouselBlock = document.querySelector(".image-carousel");
const modal = document.getElementById("cart-modal");
const goCatalogBtn = document.getElementById("go-catalog");
const goCheckoutBtn = document.getElementById("go-checkout");
const resetImageBtn = document.getElementById("reset-image");

let quantity = 1;
let currentIndex = 0;
let originalIndex = 0;

//  Завантаження товару
fetch("/products.json")
  .then((res) => res.json())
  .then((products) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    //  Заповнення даних
    titleEl.textContent = product.name;
    imageEl.src = product.image;
    imageEl.alt = product.name;
    descriptionEl.textContent = product.description;
    priceEl.textContent = `${product.price} грн`;
    stateEl.textContent = product.state || "";

    //  Карусель зображень (включає головне фото)
    const allImages = [product.image, ...(product.images || [])];

    allImages.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = product.name;
      thumb.className = "thumb";

      if (src === product.image) {
        originalIndex = index;
      }

      thumb.addEventListener("click", () => updateMainImage(index));
      thumbsContainer.appendChild(thumb);
    });

    const thumbs = Array.from(thumbsContainer.querySelectorAll(".thumb"));

    function updateMainImage(index) {
      if (thumbs[index]) {
        imageEl.src = thumbs[index].src;
        currentIndex = index;
        thumbs.forEach((thumb, i) =>
          thumb.classList.toggle("active", i === index)
        );
      }
    }

    updateMainImage(originalIndex);

    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        const newIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        updateMainImage(newIndex);
      });

      nextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % thumbs.length;
        updateMainImage(newIndex);
      });
    }

    if (resetImageBtn) {
      resetImageBtn.addEventListener("click", () => {
        updateMainImage(originalIndex);
      });
    }

    // 🔸 Кількість
    document.getElementById("increase").addEventListener("click", () => {
      quantity++;
      quantityEl.textContent = quantity;
    });

    document.getElementById("decrease").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });

    // 🔸 Додати в кошик
    document.getElementById("add-to-cart").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      initCart();

      modal.classList.remove("hidden");

      goCatalogBtn.addEventListener("click", () => {
        window.location.href = "catalog.html";
      });

      goCheckoutBtn.addEventListener("click", () => {
        window.location.href = "cart.html";
      });
    });
  })
  .catch((err) => {
    console.error("Помилка при завантаженні товару:", err);
  });
