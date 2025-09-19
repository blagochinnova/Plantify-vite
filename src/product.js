//  Вставка хедера
fetch("/src/components/header-catalog.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);
    initCart(); // лічильник кошика
  });

//  Вставка футера
fetch("/src/components/footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
  });

//  Отримуємо ID товару з URL
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

//  Початкова кількість
let quantity = 1;

//  Завантаження товарів
fetch("/products.json")
  .then((res) => res.json())
  .then((products) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    //  Заповнюємо дані
    titleEl.textContent = product.name;
    imageEl.src = product.image;
    imageEl.alt = product.name;
    descriptionEl.textContent = product.description;
    priceEl.textContent = `${product.price} грн`;
    stateEl.textContent = product.state || "";

    //  Карусель зображень
    const carouselBlock = document.querySelector(".image-carousel");
    if (product.images && product.images.length > 0) {
      if (product.images.length === 1) {
        carouselBlock.style.display = "none"; // ховаємо карусель
      } else {
        product.images.forEach((src) => {
          const thumb = document.createElement("img");
          thumb.src = src;
          thumb.alt = product.name;
          thumb.className = "thumb";
          thumb.addEventListener("click", () => {
            imageEl.src = src;
          });
          thumbsContainer.appendChild(thumb);
        });

        //  Обробники свайпу — після вставки
        const prevBtn = document.querySelector(".carousel-prev");
        const nextBtn = document.querySelector(".carousel-next");

        if (prevBtn && nextBtn) {
          prevBtn.addEventListener("click", () => {
            thumbsContainer.scrollBy({ left: -100, behavior: "smooth" });
          });

          nextBtn.addEventListener("click", () => {
            thumbsContainer.scrollBy({ left: 100, behavior: "smooth" });
          });
        }
      }
    } else {
      imageEl.src = "/images/ui/no-image.png"; // заглушка
      carouselBlock.style.display = "none";
    }

    //  Збільшити кількість
    document.getElementById("increase").addEventListener("click", () => {
      quantity++;
      quantityEl.textContent = quantity;
    });

    //  Зменшити кількість
    document.getElementById("decrease").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
      }
    });

    //  Додати в кошик
    document.getElementById("add-to-cart").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html"; // або показати модальне вікно
    });
  })
  .catch((err) => {
    console.error("Помилка при завантаженні товару:", err);
  });
function initCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}
