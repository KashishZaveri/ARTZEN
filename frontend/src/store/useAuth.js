import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  setUser: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      set({ token, isAuthenticated: true });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await fetch("https://artzen-backend.onrender.com/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isAuthenticated: true });

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err.message);
      useAuthStore.getState().setToken(null);
      return { success: false, message: err.message };
    }
  },

  signin: async (email, password) => {
    try {
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signin failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ token: data.token, user: data.user, isAuthenticated: true });

      return { success: true };
    } catch (err) {
      console.error("Signin error:", err.message);
      useAuthStore.getState().setToken(null);
      return { success: false, message: err.message };
    }
  },

  signout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  getToken: () => useAuthStore.getState().token,

  getUserInfo: () => {
    const { user } = useAuthStore.getState();
    return {
      name: user?.name || "Guest",
      email: user?.email || "guest@example.com",
    };
  },
}));

export default useAuthStore;
