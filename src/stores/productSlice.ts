import { type StateCreator } from "zustand";
import type { Product } from "../types";
import { axiosClient } from "../config/axios";
import { toast } from "react-toastify";
import { parse } from "valibot";
import { ApiToggleProductResponse } from "../schemas";

export type ProductSliceType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  toggleProduct: (productId: Product["id"], token: string) => Promise<void>;
  mutateAdminProducts: (() => void) | null;
  setMutateAdminProducts: (mutateFn: () => void) => void;
};

export const productSlice: StateCreator<ProductSliceType> = (set, get) => ({
  products: [],
  activeProduct: null,
  setProducts: (products) => {
    set(() => ({ products }));
  },
  toggleProduct: async (productId, token) => {
    try {
      const response = await axiosClient.put(
        "api/products/toggle",
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Error trying to update order's state");
      }
      // validate reponse with valibot
      const result = parse(ApiToggleProductResponse, response.data);

      toast.info(`Product ${result.available ? " activated" : "paused"}.`);
      // refetch products
      const mutate = get().mutateAdminProducts;
      if (mutate) mutate();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  mutateAdminProducts: null,
  setMutateAdminProducts: (mutateFn) => {
    set(() => ({ mutateAdminProducts: mutateFn }));
  },
});
