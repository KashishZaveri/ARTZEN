import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      set({ token, isAuthenticated: true });
    } else {
      localStorage.removeItem("token");
      set({ token: null, isAuthenticated: false });
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await fetch("/api/products/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      set({ user: data.user });
      useAuthStore.getState().setToken(data.token);

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err.message);
      useAuthStore.getState().setToken(null);
      return { success: false, message: err.message };
    }
  },

  signin: async (email, password) => {
    try {
      const res = await fetch("/api/products/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signin failed");

      set({ user: data.user });
      useAuthStore.getState().setToken(data.token);

      return { success: true };
    } catch (err) {
      console.error("Signin error:", err.message);
      useAuthStore.getState().setToken(null);
      return { success: false, message: err.message };
    }
  },

  signout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  getToken: () => {
    return useAuthStore.getState().token;
  },
}));

export default useAuthStore;
