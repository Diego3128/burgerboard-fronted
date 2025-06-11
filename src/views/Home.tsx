import { useMemo } from "react";
import { useAppStore } from "../stores/useAppstore";
import useSWR from "swr";
import { axiosClient } from "../config/axios";
import { safeParse } from "valibot";
import { ProductSchemaResponse } from "../schemas";
import type { Product as ProductType } from "../types";
import { Loader } from "../components/Loader";
import { Product } from "../components/Product";
import { useAuthStore } from "../stores/auth/useAuthStore";

export const Home = () => {
  const categoryId = useAppStore((state) => state.activeCategoryId);

  const token = useAuthStore((state) => state.token);
  const setProducts = useAppStore((state) => state.setProducts);

  const fetcher = async (): Promise<ProductType[]> => {
    if (!token) {
      throw new Error('token not available');
    }

    const response = await axiosClient("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // validate with valibot
    const result = safeParse(ProductSchemaResponse, response.data);
    console.log(result)
    if (result.success) {
      setProducts(result.output.data)
      return result.output.data;
    } else {
      setProducts([]);
      return [];
    }
  };

  const { data, isLoading } = useSWR(
    "/api/products",
    fetcher,
    {
      // refreshInterval: 5000
    }
  );

  console.log('rendering home')

  const displayedProducts: ProductType[] = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }
    // return all with no category selected
    if (!categoryId) {
      const products = data.filter(p => p.available);
      return products;
    }
    // filter products by the categoryId and availability
    const products = data.filter(p => p.category_id === categoryId && p.available);
    return products;
  }, [data, isLoading, categoryId])

  // console.log("home rendered");
  return (
    <div className="pt-3.5 border-r-2 border-r-gray-400 border-b-2 border-b-gray-400 pb-5">
      <h2 className=" px-4 font-bold text-2xl md:text-3xl text-gray-700 mb-5">
        {"Menu"}
      </h2>
      <p className="px-4 text-gray-700 font-semibold text-xl border-b-2 border-b-gray-400 pb-5">
        Pick what you wish and create your order here
      </p>

      <div className="min-h-[80dvh] max-h-[80dvh] md:max-h-dvh overflow-y-auto grid xs:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 py-10 px-2 relative">
        {isLoading ? <Loader /> : displayedProducts.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
