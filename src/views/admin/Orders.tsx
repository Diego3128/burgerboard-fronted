import useSWR from "swr";
import { axiosClient } from "../../config/axios";
import { useAuthStore } from "../../stores/auth/useAuthStore";
import { ApiOrderResponseSchema, OrderSchema } from "../../schemas";
import { safeParse, type InferOutput } from "valibot";
import { Loader } from "../../components/Loader";
import { OrderList } from "../../components/admin/orders/OrderList";
import { useAppStore } from "../../stores/useAppstore";
import { useEffect } from "react";

export type OrderType = InferOutput<typeof OrderSchema>;

export const Orders = () => {

    const setOrders = useAppStore((state) => state.setOrders);
    const setMutateOrders = useAppStore((state) => state.setMutateOrders);

    const token = useAuthStore((state) => state.token);

    const fetcher = async (): Promise<OrderType[]> => {
        if (!token) {
            //force logout // todo
        }
        const response = await axiosClient("/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // validate with valibot
        const result = safeParse(ApiOrderResponseSchema, response.data);
        if (result.success) {
            return result.output.data;
        } else {
            console.log(result.issues);
            return [];
        }

    };

    const { data, isLoading, mutate } = useSWR(
        "/api/orders",
        fetcher,
        {
            refreshInterval: 5000
        }
    );
    //sync with stored orders 
    useEffect(() => {
        if (data) setOrders(data);
    }, [data, setOrders])

    // set mutate function
    useEffect(() => {
        if (mutate) {
            setMutateOrders(mutate)
        }
    }, [mutate, setMutateOrders])

    return (
        <>
            <h2 className="text-center text-xl md:text-2xl text-gray-700 mt-4 mb-8">Manage your orders</h2>

            {isLoading && (
                <div className="h-[50dvh] md:h-full relative"><Loader /></div>
            )}

            {data && <OrderList orders={data} />}
        </>
    )
}
