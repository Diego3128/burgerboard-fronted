import type { StateCreator } from "zustand";
import type { OrderType } from "../views/admin/Orders";
import { axiosClient } from "../config/axios";

export type OrderSliceType = {
  orders: OrderType[];
  setOrders: (orders: OrderType[]) => void;
  completeOrder: (orderId: OrderType["id"], token: string | null) => void;
  mutateOrders: (() => void) | null; // trigger useSWR refetch
  setMutateOrders: (mutateFn: () => void) => void;
};

export const orderSlice: StateCreator<OrderSliceType> = (set, get) => ({
  orders: [],
  setOrders: (orders) => {
    set(() => ({ orders }));
  },
  mutateOrders: null,
  setMutateOrders: (mutateFn) => {
    set(() => ({ mutateOrders: mutateFn }));
  },
  completeOrder: async (orderId, token) => {
    try {
      if (!token) throw new Error("Token expected");
      const response = await axiosClient.put(
        "api/orders/state",
        {
          order_id: orderId,
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
      // refetch orders
      const mutate = get().mutateOrders;
      if (mutate) mutate();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});
