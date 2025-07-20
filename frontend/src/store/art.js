import { create } from "zustand";

const useArtStore = create((set) => ({
  myArts: [],
  editingArt: null,
  loading: false,
  updating: false,
  error: null,

  // Fetch all artworks
  fetchMyArts: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/products/my-arts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        set({ myArts: data.data, loading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      set({ error: "Failed to load artworks", loading: false });
    }
  },

  // Delete an artwork
  deleteArt: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/my-arts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.ok) {
        set((state) => ({
          myArts: state.myArts.filter((art) => art._id !== id),
        }));
      } else {
        console.error("Delete failed:", result.message);
      }
    } catch (err) {
      console.error("Delete request error:", err.message);
    }
  },

  // Update an artwork
  updateArt: async (id, updatedArt) => {
    set({ updating: true });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/my-arts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedArt),
      });

      const data = await res.json();
      if (data.success) {
        set((state) => ({
          myArts: state.myArts.map((art) =>
            art._id === id ? { ...art, ...data.data } : art
          ),
          editingArt: null,
          updating: false,
        }));
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Update failed:", err.message);
      set({ updating: false });
    }
  },

  // Fetch a specific artwork for editing
  editArt: async (id) => {
    set({ editingArt: null }); // reset previous state
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/my-arts/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success && data.data) {
        set({ editingArt: data.data });
      } else {
        console.error("Invalid artwork response:", data.message);
      }
    } catch (err) {
      console.error("editArt error:", err.message);
    }
  },

  // Optional: Reset edit mode manually
  clearEditingArt: () => set({ editingArt: null }),

  updateField: (field, value) =>
    set((state) => ({
      editingArt: {
        ...state.editingArt,
        [field]: value,
      },
    })),
}));

export default useArtStore;
