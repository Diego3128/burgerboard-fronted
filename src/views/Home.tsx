import { useEffect } from "react";
import { useAppStore } from "../stores/useAppstore";
import { Product } from "../components/Product";

export const Home = () => {
  const getProducts = useAppStore((state) => state.getProducts);
  const products = useAppStore((state) => state.products);
  const categoryId = useAppStore((state) => state.activeCategoryId);

  useEffect(() => {
    getProducts();
  }, []);

  const displayedProducts = categoryId
    ? products.filter((p) => p.category_id === categoryId)
    : products;


  console.log("home rendered");
  return (
    <div className="pt-3.5 border-r-2 border-r-gray-400 border-b-2 border-b-gray-400 pb-5">
      <h2 className=" px-4 font-bold text-2xl md:text-3xl text-gray-700 mb-5">
        {"Menu"}
      </h2>
      <p className="px-4 text-gray-700 font-semibold text-xl border-b-2 border-b-gray-400 pb-5">
        Pick what you wish and create your order here
      </p>

      <div className="max-h-[80dvh] md:max-h-dvh overflow-y-auto grid xs:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 py-10 px-2 ">
        {displayedProducts.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
