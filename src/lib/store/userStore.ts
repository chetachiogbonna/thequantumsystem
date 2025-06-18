import { create } from "zustand";

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));