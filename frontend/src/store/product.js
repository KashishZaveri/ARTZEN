import {create} from 'zustand';

export const useProductStore = create((set) => ({ 
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async(newProduct) => {
        if(!newProduct.image || !newProduct.name || !newProduct.description || !newProduct.price) {
            return {success: false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newProduct),
        });

        
  if (!res.ok) {
    const errorText = await res.text(); // read raw text once
    throw new Error(errorText || "Server error");
  }

        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success: true, message: "Product created successfully"};
    },
 }));
 