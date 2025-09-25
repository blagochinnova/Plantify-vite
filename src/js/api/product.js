// Імпорти
import { renderHeaderShop } from "../../components/HeaderShop.js";
import { renderFooter } from "../../components/Footer.js";
import { addToCart, updateCartCount } from "../cart/cart-utils.js";
import { setupCartModal } from "../../components/CartModal.js";

// Рендер хедеру і футера
renderHeaderShop();
renderFooter();
updateCartCount();

// Ініціалізація модалки кошика
const { showModal } = setupCartModal({
  modalId: "cart-modal",
  goCatalogId: "go-catalog",
  goCheckoutId: "go-checkout",
});

// Отримання ID товару з URL
const params = new URLSearchParams(location.search);
const productId = params.get("id");

// DOM-елементи
const titleEl = document.getElementById("product-title");
const imageEl = document.getElementById("product-image");
const descriptionEl = document.getElementById("product-description");
const priceEl = document.getElementById("product-price");
const stateEl = document.getElementById("product-state");
const quantityEl = document.getElementById("quantity");
const thumbsContainer = document.querySelector(".carousel-thumbs");
const resetImageBtn = document.getElementById("reset-image");

let quantity = 1;
let currentIndex = 0;
let originalIndex = 0;

//  Функція завантаження товарів з products.json
export async function getProducts() {
  try {
    const response = await fetch("/data/products.json");
    if (!response.ok) throw new Error("Не вдалося завантажити products.json");
    return await response.json();
  } catch (err) {
    console.error("Помилка при завантаженні товарів:", err);
    return [];
  }
}

// Завантаження товару
getProducts()
  .then((products) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Заповнення даних
    titleEl.textContent = product.name;
    imageEl.src = product.image;
    imageEl.alt = product.name;
    descriptionEl.textContent = product.description;
    priceEl.textContent = `${product.price} грн`;
    stateEl.textContent = product.state || "";

    // Карусель зображень
    const allImages = [product.image, ...(product.images || [])];

    allImages.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = product.name;
      thumb.className = "thumb";

      if (src === product.image) originalIndex = index;

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

    // Навігація по каруселі
    document.querySelector(".carousel-prev")?.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      updateMainImage(newIndex);
    });

    document.querySelector(".carousel-next")?.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % thumbs.length;
      updateMainImage(newIndex);
    });

    resetImageBtn?.addEventListener("click", () => {
      updateMainImage(originalIndex);
    });

    // Зміна кількості
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

    // Додавання в кошик
    document.getElementById("add-to-cart").addEventListener("click", () => {
      addToCart(product, quantity);
      updateCartCount();
      showModal();
    });
  })
  .catch((err) => {
    console.error("Помилка при завантаженні товару:", err);
  });
