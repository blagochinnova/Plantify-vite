import { initNavigation } from "./js/nav";
import { initCart } from "./js/cart";

// Вставка хедера
fetch("/src/components/header-home.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);
    initNavigation(); // запускаємо бургер
    initCart(); //запускаємо кошик після вставки хедера
  });

// Вставка футера
fetch("/src/components/footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
  });

// Ініціалізація кошика
