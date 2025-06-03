import { formatCurrency } from "../helpers";
import { useAppStore } from "../stores/useAppstore";
import type { Product as ProductT } from "../types";
interface ProductType {
  product: ProductT;
}
export const Product = ({ product }: ProductType) => {
  const setActiveProduct = useAppStore((state) => state.setActiveProduct);

  return (
    <div className="group p-3 rounded-xl select-none animate-popIn">
      <div className="relative">
        <img
          className=" min-h-64 object-cover group-hover:-translate-y-3 transition-transform rounded-xl animate-glow duration-700"
          src={product.image}
          alt={`${product.name} image`}
        />

        <p className="absolute rounded-2xl p-2 text-gray-100 font-semibold bg-green-500 text-center -top-1 -left-2.5  group-hover:-translate-y-5 group-hover:-translate-x-2 transition-transform duration-700 md:text-lg">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className="relative">
        {/* add to cart  btn*/}
        <div className="absolute -top-4 left-0 w-full flex items-center justify-end z-20">
          <button
            onClick={() => setActiveProduct(product.id)}
            title="add to cart"
            className="bg-yellow-300 rounded-lg p-1.5 text-sm group-hover:-translate-y-2 group-hover:-translate-x-1 transition-transform duration-300 hover:contrast-150 cursor-pointer hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-900">
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </button>
        </div>
        {/* product name */}
        <p className="w-[95%] mx-auto rounded-2xl p-4 text-white bg-indigo-700 -mt-6 z-10 relative font-semibold text-center shadow-sm shadow-indigo-900 group-hover:scale-105 group-hover:translate-y-2 transition-transform duration-700 text-xs sm:text-sm text-balance">
          {product.name}
        </p>
      </div>
    </div>
  );
};
