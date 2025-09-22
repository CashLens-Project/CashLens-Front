import { create } from 'zustand';
import dayjs from 'dayjs';

const currentMonth = dayjs().format('YYYY-MM');

export const useFiltersStore = create((set) => ({
  month: currentMonth,
  setMonth: (month) => set({ month }),
}));

export const useGoalsStore = create((set, get) => ({
  goals: JSON.parse(localStorage.getItem('goals') || '{}'),
  setGoal: (month, value) => {
    const next = { ...get().goals, [month]: Number(value || 0) };
    localStorage.setItem('goals', JSON.stringify(next));
    set({ goals: next });
  },
}));