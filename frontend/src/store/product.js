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
  
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Include the token here
      },
      body: JSON.stringify(newProduct),
    });
  
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
  
    return { success: true, message: "Product created successfully" };
  },
  // Fetch all products
  fetchProducts: async () => {
    try {
      set({ loading: true });

      const res = await fetch("/api/products", {
        headers: {
          "Content-Type": "application/json",
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

 
  // 🗑️ Delete product
  deleteProduct: async (pid) => {
    try {
      set({ loading: true });

      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      set((state) => ({
        products: state.products.filter((p) => p._id !== pid),
        myArts: state.myArts.filter((p) => p._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Delete product error:", err.message);
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },

  // 🛠️ Update product
  updateProduct: async (pid, updatedProduct) => {
    try {
      set({ loading: true });

      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      set((state) => ({
        products: state.products.map((p) => (p._id === pid ? data.data : p)),
        myArts: state.myArts.map((p) => (p._id === pid ? data.data : p)),
      }));

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Update product error:", err.message);
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },
}));