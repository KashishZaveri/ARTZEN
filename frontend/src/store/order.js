import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  fetchOrders: async (userId) => {
    try {
      const res = await fetch(`https://artzen-backend.onrender.com/api/orders/${userId}`);
      const data = await res.json();
      set({ orders: data });
    } catch (error) {
      console.error("Order fetch failed:", error.message);
    }
  },
}));
