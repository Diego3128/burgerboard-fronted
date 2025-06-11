import { create } from "zustand";
import { productSlice, type ProductSliceType } from "./productSlice";
import { devtools } from "zustand/middleware";
import { cartSlice, type CartSliceType } from "./cartSlice";
import { categorySlice, type CategorySliceType } from "./categorySlice";
import { orderSlice, type OrderSliceType } from "./orderSlice";

type StoreStateType = ProductSliceType &
  CartSliceType &
  CategorySliceType &
  OrderSliceType;

export const useAppStore = create<StoreStateType>()(
  devtools(
    (...a) => ({
      ...productSlice(...a),
      ...cartSlice(...a),
      ...categorySlice(...a),
      ...orderSlice(...a),
    }),
    {
      name: "burgerboard",
    }
  )
);
