import type { StateCreator } from "zustand";
import type { Product, ProductInfo } from "../types";
import type { ProductSliceType } from "./productSlice";
import { toast } from "react-toastify";

export type CartSliceType = {
  order: ProductInfo[];
  activeProduct: Product | null;
  total: number;
  calcTotal: () => void;
  setActiveProduct: (productId: Product["id"]) => void;
  addToCart: (product: ProductInfo) => void;
  deleteFromCart: (productId: Product["id"]) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

export const cartSlice: StateCreator<
  CartSliceType & ProductSliceType, //whole state this slice has access to
  [],
  [],
  CartSliceType //  state this slace returns
> = (set, get) => {
  return {
    order: [],
    isModalOpen: false,
    activeProduct: null,
    total: 0,
    closeModal: () => {
      set(() => ({ isModalOpen: false, activeProduct: null }));
    },
    openModal: () => {
      set(() => ({ isModalOpen: true }));
    },
    setActiveProduct: (productId) => {
      const activeProduct =
        get().products.find((p) => p.id === productId) || null;
      set(() => ({ activeProduct, isModalOpen: true }));
    },
    addToCart: (product) => {
      // check if product already exists
      const exists = get().order.some((p) => p.id === product.id);
      if (exists) {
        // update amount
        const updatedOrder: ProductInfo[] = get().order.map((orderProduct) => {
          return orderProduct.id === product.id
            ? { ...orderProduct, amount: product.amount }
            : orderProduct;
        });

        set(() => ({
          order: updatedOrder,
          isModalOpen: false,
          activeProduct: null,
        }));

        toast.info("Item updated", {
          className: "border border-gray-600/70",
        });
      } else {
        // add new product
        set((state) => ({
          order: [...state.order, product],
          isModalOpen: false,
          activeProduct: null,
        }));

        toast.info("Item added to the order", {
          className: "border border-gray-600/70",
        });
      }
    },
    deleteFromCart: (productId) => {
      set((state) => ({
        order: state.order.filter((p) => p.id !== productId),
      }));
    },
    calcTotal: () => {
      const total = get().order.reduce((accumulator, currentProduct) => {
        return accumulator + currentProduct.price * currentProduct.amount;
      }, 0);

      set(() => ({ total }));
    },
  };
};
