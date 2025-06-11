import { safeParse } from "valibot";
import { axiosClient } from "../../config/axios";
import { useAuthStore } from "../../stores/auth/useAuthStore";
import type { Product } from "../../types";
import { ProductSchemaResponse } from "../../schemas";
import useSWR from "swr";
import { Loader } from "../../components/Loader";
import { ProductList } from "../../components/admin/products/ProductList";
import { useAppStore } from "../../stores/useAppstore";
import { useEffect } from "react";

export const Products = () => {
    const token = useAuthStore((state) => state.token);
    const setMutateAdminProducts = useAppStore((state) => state.setMutateAdminProducts);

    const fetcher = async (): Promise<Product[]> => {
        const response = await axiosClient("/api/products", {
            headers: {
                Authorization: `Bearer ${token!}`
            }
        });
        // validate with valibot
        const result = safeParse(ProductSchemaResponse, response.data);
        if (result.success) {
            return result.output.data;
        } else {
            console.log(result.issues);
            return [];
        }

    };
    //only fetches on mount // refetch is triggered with mutate after changing a product
    const { data, isLoading, mutate } = useSWR(
        "/api/products",
        fetcher,
        {
            // refreshInterval: 5000
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
        }
    );
    //set mutate function to productSlice
    useEffect(() => {
        if (mutate) {
            setMutateAdminProducts(mutate)
        }
    }, [mutate, setMutateAdminProducts])

    return (
        <>
            <h2 className="text-center text-xl md:text-2xl text-gray-700 mt-4 mb-8">Manage your products</h2>
            {isLoading && (
                <div className="h-[50dvh] md:h-full relative"><Loader /></div>
            )}
            {data && <ProductList products={data} />}
        </>
    )
}
