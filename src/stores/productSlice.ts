import { type StateCreator } from "zustand";
import type { Product } from "../types";
import { fetchProducts } from "../services";

export type ProductSliceType = {
  products: Product[];
  getProducts: () => void;
};

export const productSlice: StateCreator<ProductSliceType> = (set) => ({
  products: [],
  activeProduct: null,
  getProducts: () => {
    const fetchedProducts = fetchProducts();
    set(() => ({ products: fetchedProducts }));
  },
});
