import { create } from "zustand";
import useAuthStore from "./useAuth.js";

export const useProductStore = create((set, get) => ({
  // State
  products: [],
  myArts: [],
  selectedProduct: null,
  loading: false,

  // Basic getters
  getProducts: () => get().products,
  getMyArts: () => get().myArts,
  getSelectedProduct: () => get().selectedProduct,
  isLoading: () => get().loading,

  // Setters
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setLoading: (loading) => set({ loading }),

  // Utility
  getToken: () => useAuthStore.getState().token,

  createProduct: async (newProduct) => {
    if (
      !newProduct.image ||
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price
    ) {
      return { success: false, message: "Please fill in all fields" };
    }

    const token = localStorage.getItem("token"); // or get it from an auth store

    const res = await fetch("https://artzen-backend.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token here
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  },
  // Fetch all products
  fetchProducts: async () => {
    const token = localStorage.getItem("token"); // or get it from an auth store

    try {
      set({ loading: true });

      const res = await fetch("https://artzen-backend.onrender.com/api/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set({ products: data.data });
    } catch (err) {
      console.error("Fetch products failed:", err.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
