export const createApiClient = (baseUrl) => {
  const request = async (path, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || `Request failed with ${res.status}`);
    }

    if (res.status === 204) return null;
    return res.json();
  };

  return {
    getAll: () => request("/products"),
    create: (payload) => request("/products", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) =>
      request(`/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    remove: (id) => request(`/products/${id}`, { method: "DELETE" })
  };
};
