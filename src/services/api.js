const BASE_URL = import.meta.env.VITE_API_URL || "https://acueducto-2.onrender.com/api";

export const api = {
    async get(endpoint) {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    },

    async post(endpoint, data) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    },

    async put(endpoint, data) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return await res.json();
    },

    async delete(endpoint) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.status === 204 ? null : await res.json();
    },
};
