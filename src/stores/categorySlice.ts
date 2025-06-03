import type { StateCreator } from "zustand";
import type { CategoryItem } from "../types";
import { fetchCategories } from "../services";

export type CategorySliceType = {
  loadingCategories: boolean;
  categories: CategoryItem[];
  errorCategories: string | null;
  getCategories: (signal: AbortSignal) => Promise<void>;
  setActiveCategory: (categoryId: CategoryItem["id"]) => void;
  activeCategoryId: CategoryItem["id"] | null;
};

export const categorySlice: StateCreator<CategorySliceType> = (set) => ({
  loadingCategories: true,
  errorCategories: null,
  categories: [],
  activeCategoryId: null,
  setActiveCategory: (categoryId) => {
    set(() => ({ activeCategoryId: categoryId }));
  },
  getCategories: async (signal: AbortSignal) => {
    try {
      set({ errorCategories: null });
      const data = await fetchCategories(signal);
      if (data) {
        set(() => ({ categories: data }));
      }
    } catch (error) {
      set({ errorCategories: (error as Error).message });
    } finally {
      set({ loadingCategories: false });
    }
  },
});
