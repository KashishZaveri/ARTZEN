import { create } from "zustand";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const useArtStore = create((set) => ({
  myArts: [],
  editingArt: null,
  loading: false,
  updating: false,
  error: null,

  fetchMyArts: async (page = 1, limit = 10) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      set({ error: "Authentication required", loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await fetch(`${baseURL}/api/arts/my-arts?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        set({ myArts: data.data, loading: false });
      } else {
        throw new Error(data.message || "Failed to fetch artworks");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      set({ error: "Failed to load artworks", loading: false });
    }
  },

  deleteArt: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${baseURL}/api/arts/my-arts/${id}`, {
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

  updateArt: async (id, updatedArt) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set({ updating: true });
    try {
      const res = await fetch(`${baseURL}/api/arts/my-arts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedArt),
      });

      const data = await res.json();
      if (res.ok && data.success) {
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

  editArt: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set({ editingArt: null });
    try {
      const res = await fetch(`${baseURL}/api/arts/my-arts/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.success && data.data) {
        set({ editingArt: data.data });
      } else {
        console.error("Invalid artwork response:", data.message);
      }
    } catch (err) {
      console.error("editArt error:", err.message);
    }
  },

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