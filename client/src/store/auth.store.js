
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user : null,
    loading: false,
    setUser: (userData) => set({user : userData}),
    setLoading: (loadingData) => set({ loading : loadingData})

}))