const NOVA_API_URL = "https://api.novaposhta.ua/v2.0/json/";
const UKR_API_URL = "https://api.ukrposhta.ua/";
const NOVA_API_KEY = ""; //  треба буде вставити ключ
const UKR_TOKEN = ""; //  треба буде вставити ключ

export async function getNovaAreas() {
  const body = {
    apiKey: NOVA_API_KEY,
    modelName: "Address",
    calledMethod: "getAreas",
    methodProperties: {},
  };

  const res = await fetch(NOVA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.data || [];
}

export async function getNovaCities(areaRef) {
  const body = {
    apiKey: NOVA_API_KEY,
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: { AreaRef: areaRef },
  };

  const res = await fetch(NOVA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.data || [];
}

export async function getNovaWarehouses(cityRef) {
  const body = {
    apiKey: NOVA_API_KEY,
    modelName: "AddressGeneral",
    calledMethod: "getWarehouses",
    methodProperties: { CityRef: cityRef },
  };

  const res = await fetch(NOVA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.data || [];
}

export async function getUkrRegions() {
  const res = await fetch(`${UKR_API_URL}regions`, {
    headers: { Authorization: `Bearer ${UKR_TOKEN}` },
  });

  const data = await res.json();
  return data || [];
}

export async function getUkrSettlements(regionId) {
  const res = await fetch(`${UKR_API_URL}settlements?regionId=${regionId}`, {
    headers: { Authorization: `Bearer ${UKR_TOKEN}` },
  });

  const data = await res.json();
  return data || [];
}

export async function getUkrPostOffices(settlementId) {
  const res = await fetch(
    `${UKR_API_URL}postoffices?settlementId=${settlementId}`,
    {
      headers: { Authorization: `Bearer ${UKR_TOKEN}` },
    }
  );

  const data = await res.json();
  return data || [];
}
