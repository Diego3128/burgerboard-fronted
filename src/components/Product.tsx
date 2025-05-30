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
          className="group-hover:-translate-y-3 transition-transform rounded-xl animate-glow duration-700"
          src={`/img/${product.image}.jpg`}
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
            <img
              src="/img/icons/icono_cart_add.svg"
              alt="add to cart icon"
              className="size-5"
            />
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
