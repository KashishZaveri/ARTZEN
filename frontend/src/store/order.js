import { create } from "zustand";

const baseURL =  import.meta.env.VITE_BACKEND_URL;

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async (userId) => {
    try {
      const res = await fetch(`${baseURL}/api/orders/${userId}`);
      const data = await res.json();
      set({ orders: data });
    } catch (error) {
      console.error("Order fetch failed:", error.message);
    }
  },
}));
