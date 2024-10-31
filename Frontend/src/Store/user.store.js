import { create } from "zustand";

export const userStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user: user }),
  registerUser: async (userInfo) => {
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      return { success: false, message: "Please fill out all the fields" };
    }
    const res = await fetch("/api/createUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: "please enter valid details" };
    set((state) => ({ user: userInfo, isLoggedIn: true }));
    return { success: true, message: "User regsitered successfully" };
  },
  verifyUser: async () => {
    const res = await fetch("/api/verify");
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({ user: data.user, isLoggedIn: true }));
    return { success: true, message: "User is live" };
  },
  logoutUser: async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      body: null,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: "There was error logging out" };
    set((state) => ({ user: null, isLoggedIn: false }));
    return { success: true, message: "logged out successfully" };
  },
}));
