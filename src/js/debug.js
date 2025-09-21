console.log("🧪 DEBUG: Перевірка DOM");

const mains = document.querySelectorAll("main");
console.log("Кількість <main>:", mains.length);

mains.forEach((main, index) => {
  console.log(`→ main[${index}]`, main);

  // Візуальна рамка для кожного <main>
  main.style.outline = "2px dashed red";
  main.setAttribute("data-debug-index", index);
});

const headers = document.querySelectorAll("header");
console.log("Кількість <header>:", headers.length);

const footers = document.querySelectorAll("footer");
console.log("Кількість <footer>:", footers.length);

const scripts = Array.from(document.scripts).map((s) => s.src || "inline");
console.log("Підключені скрипти:", scripts);
