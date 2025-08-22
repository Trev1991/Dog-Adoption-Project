const BASE = import.meta.env.VITE_API_URL;

async function http(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

async function tryBreedsEndpoint() {
  try {
    const res = await http(`/api/dogs/breeds`);
    if (Array.isArray(res)) return res.filter(Boolean);
    if (res && Array.isArray(res.breeds)) return res.breeds.filter(Boolean);
  } catch (_) { /* ignore */ }
  return null;
}

async function deriveBreedsFromDogs() {
  try {
    const data = await http(`/api/dogs?limit=1000`);
    const items = Array.isArray(data) ? data : (data.items || data.results || []);
    const breeds = Array.from(new Set(items.map(d => d.breed).filter(Boolean))).sort();
    return breeds;
  } catch (_) {
    return [];
  }
}

export const api = {
  listDogs: ({ page = 1, limit = 12, status, breed, q } = {}) => {
    const p = new URLSearchParams({ page, limit });
    if (status) p.set("status", status);
    if (breed) p.set("breed", breed);
    if (q) p.set("q", q);
    return http(`/api/dogs?${p.toString()}`);
  },
  getDog: (id) => http(`/api/dogs/${id}`),
  createApplication: (payload) => http(`/api/applications`, { method: "POST", body: payload }),
  getBreeds: async () => {
    const direct = await tryBreedsEndpoint();
    if (direct && direct.length) return direct;
    return deriveBreedsFromDogs();
  }
};
