import { type StateCreator } from "zustand";
import type { Product } from "../types";

export type ProductSliceType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const productSlice: StateCreator<ProductSliceType> = (set) => ({
  products: [],
  activeProduct: null,
  setProducts: (products) => {
    set(() => ({ products }));
  },
});
