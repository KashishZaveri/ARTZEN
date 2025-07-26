import { create } from "zustand";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async (userId) => {
    try {
      const res = await fetch(`${baseURL}/orders/${userId}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        set({ orders: data });
      } else {
        console.error("Invalid response format or error:", data.message || data);
      }
    } catch (error) {
      console.error("Order fetch failed:", error.message);
    }
  },
}));