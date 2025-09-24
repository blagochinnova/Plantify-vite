export function setupCartModal({ modalId, goCatalogId, goCheckoutId }) {
  const modal = document.getElementById(modalId);
  const goCatalogBtn = document.getElementById(goCatalogId);
  const goCheckoutBtn = document.getElementById(goCheckoutId);

  if (!modal) return;

  // Показати модалку
  function showModal() {
    modal.classList.remove("hidden");
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
