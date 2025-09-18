//Для отримання параметрів з URL, ?category=strawberry
const params = new URLSearchParams(window.location.search);
const category = params.get("category"); //Витягнути значення категорії

//Мапа для відображення назв категорії
const titleMap = {
  strawberry: "Полуниця",
  grapes: "Виноград",
  raspberry: "Малина",
  currant: "Смородина",
  blackberry: "Ожина",
};

// Заголовок куди вставляти назву активної категорії

const activeTitle = document.querySelector("active-category-title");

if (category && activeTitle) {
  activeTitle.textContent = "Категорія $(titleMap[category]) || category";
}

//Пошук всіх товарних картків

const allProducts = document.querySelectorAll("card");

allProducts.forEach((card) => {
  const cardCategory = card.dataset.category;
  card.style.display = cardCategory === category ? "block" : "none";
});
