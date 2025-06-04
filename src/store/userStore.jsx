"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const userStorage = create(
  persist(
    (set, get) => ({
      userId: null,
      userRole: null,
      userEmail: null,

      // Actions
      setCurrentUserId: (userId) => set({ userId }),
      setCurrentUserRole: (userRole) => set({ userRole }),
      setCurrentUserEmail: (userEmail) => set({ userEmail }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userId: state.userId,
        userRole: state.userRole,
        userEmail: state.userEmail,
      }),
    }
  )
);

export default userStorage;
