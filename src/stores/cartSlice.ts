import type { StateCreator } from "zustand";
import type { Product, ProductInfo } from "../types";
import type { ProductSliceType } from "./productSlice";
import { toast } from "react-toastify";
import { axiosClient } from "../config/axios";
import type { NavigateFunction } from "react-router-dom";

export type CartSliceType = {
  order: ProductInfo[];
  activeProduct: Product | null;
  total: number;
  placingOrder: boolean;
  orderCreated: boolean;
  calcTotal: () => void;
  setActiveProduct: (productId: Product["id"]) => void;
  addToCart: (product: ProductInfo) => void;
  deleteFromCart: (productId: Product["id"]) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  placeOrder: (
    logout: (navigate: NavigateFunction) => Promise<void>,
    navigate: NavigateFunction
  ) => Promise<void>;
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
    placingOrder: false,
    orderCreated: false,
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
    placeOrder: async (logout, navigate) => {
      if (!get().order.length) {
        toast.error("Your order is invalid");
        return;
      }
      try {
        set(() => ({ placingOrder: true }));
        const token = localStorage.getItem("AUTH-TOKEN");
        if (!token) {
          throw new Error("No token available");
        }
        const reponse = await axiosClient.post(
          "/api/orders",
          {
            products: get().order.map((p) => {
              return { id: p.id, quantity: p.amount };
            }),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (reponse.status === 200) {
          set(() => ({ orderCreated: true }));
          toast.success("Order created successfully", {
            className: "border border-gray-600/70",
          });

          toast.info(
            "You will be automatically logged out in a few seconds...",
            {
              className: "border border-gray-600/70",
              hideProgressBar: false,
              autoClose: 7000,
              // onClose: () => {
              //   logout(navigate);
              // },
            }
          );
          setTimeout(() => logout(navigate), 7000);
        } else {
          throw new Error("Order not created.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong creating the order.", {
          className: "border border-gray-600/70",
        });
      } finally {
        set(() => ({ placingOrder: false, order: [] }));
      }
    },
  };
};
