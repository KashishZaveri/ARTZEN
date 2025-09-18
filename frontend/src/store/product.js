import { create } from "zustand";
import useAuthStore from "./useAuth.js";

const baseURL = import.meta.env.VITE_BACKEND_URL;

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

    const res = await fetch(`${baseURL}/api/products`, {
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
  fetchProducts: async (page = 1, limit = 5) => {
    const token = localStorage.getItem("token");
    try {
      set({ loading: true });
  
      const res = await fetch(`${baseURL}/api/products?page=${page}&limit=${limit}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      set((state) => ({
        products: page === 1 ? data.data : [...state.products, ...data.data],
      }));
    } catch (err) {
      console.error("Fetch products failed:", err.message);
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
