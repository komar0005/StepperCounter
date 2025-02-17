import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

interface ZustandStorage {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

const zustandStorage: ZustandStorage = {
  getItem: (name: string) => storage.getString(name) || null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
};

interface StoreState {
  dailyGoal: number;
  completedDays: Record<string, boolean>;
  setDailyGoal: (goal: number) => void;
  markDayAsCompleted: (date: string) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      dailyGoal: 10000,
      completedDays: {},
      setDailyGoal: (goal: number) => set({ dailyGoal: goal }),
      markDayAsCompleted: (date: string) =>
        set((state) => ({
          completedDays: { ...state.completedDays, [date]: true },
        })),
    }),
    {
      name: "step-tracker-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useStore;
