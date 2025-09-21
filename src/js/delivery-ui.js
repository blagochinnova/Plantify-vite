// логіка оновлення селектів
import {
  getNovaAreas,
  getNovaCities,
  getNovaWarehouses,
  getUkrRegions,
  getUkrSettlements,
  getUkrPostOffices,
} from "./delivery.js";

export function setupDeliverySelectors() {
  const carrierSelect = document.getElementById("delivery-service");
  const regionSelect = document.getElementById("region-select");
  const citySelect = document.getElementById("city-select");
  const branchSelect = document.getElementById("branch-select");

  carrierSelect.addEventListener("change", async () => {
    const carrier = carrierSelect.value;
    regionSelect.innerHTML = `<option>Завантаження...</option>`;
    citySelect.innerHTML = "";
    branchSelect.innerHTML = "";

    if (carrier === "nova") {
      const areas = await getNovaAreas();
      regionSelect.innerHTML = areas
        .map((a) => `<option value="${a.Ref}">${a.Description}</option>`)
        .join("");
    } else if (carrier === "ukr") {
      const regions = await getUkrRegions();
      regionSelect.innerHTML = regions
        .map((r) => `<option value="${r.id}">${r.name}</option>`)
        .join("");
    }
  });

  regionSelect.addEventListener("change", async () => {
    const carrier = carrierSelect.value;
    const regionValue = regionSelect.value;
    citySelect.innerHTML = `<option>Завантаження...</option>`;
    branchSelect.innerHTML = "";

    if (carrier === "nova") {
      const cities = await getNovaCities(regionValue);
      citySelect.innerHTML = cities
        .map((c) => `<option value="${c.Ref}">${c.Description}</option>`)
        .join("");
    } else if (carrier === "ukr") {
      const settlements = await getUkrSettlements(regionValue);
      citySelect.innerHTML = settlements
        .map((s) => `<option value="${s.id}">${s.name}</option>`)
        .join("");
    }
  });

  citySelect.addEventListener("change", async () => {
    const carrier = carrierSelect.value;
    const cityValue = citySelect.value;
    branchSelect.innerHTML = `<option>Завантаження...</option>`;

    if (carrier === "nova") {
      const warehouses = await getNovaWarehouses(cityValue);
      branchSelect.innerHTML = warehouses
        .map((w) => `<option value="${w.Ref}">${w.Description}</option>`)
        .join("");
    } else if (carrier === "ukr") {
      const offices = await getUkrPostOffices(cityValue);
      branchSelect.innerHTML = offices
        .map((o) => `<option value="${o.id}">${o.name}</option>`)
        .join("");
    }
  });
}
