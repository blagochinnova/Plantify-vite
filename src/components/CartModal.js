export function setupCartModal({ modalId, goCatalogId, goCheckoutId }) {
  const modal = document.getElementById(modalId);
  const goCatalogBtn = document.getElementById(goCatalogId);
  const goCheckoutBtn = document.getElementById(goCheckoutId);

  // Показати модалку
  function showModal() {
    if (modal) {
      modal.classList.remove("hidden");
    } else {
      console.warn(`Модалка з id "${modalId}" не знайдена`);
    }
  }

  // Обробка кнопок
  if (goCatalogBtn) {
    goCatalogBtn.addEventListener("click", () => {
      window.location.href = "catalog.html";
    });
  }

  if (goCheckoutBtn) {
    goCheckoutBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  return { showModal };
}
