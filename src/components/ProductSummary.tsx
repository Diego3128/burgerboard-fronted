import { formatCurrency } from "../helpers";
import { useAppStore } from "../stores/useAppstore";
import type { ProductInfo } from "../types";
type ProductSummaryProps = {
  product: ProductInfo;
};

export const ProductSummary = ({ product }: ProductSummaryProps) => {
  const deleteFromCart = useAppStore((state) => state.deleteFromCart);
  const setActiveProduct = useAppStore((state) => state.setActiveProduct);

  const handleClickDelete = () => {
    deleteFromCart(product.id);
  };

  const handleClickEdit = () => {
    setActiveProduct(product.id);
  };

  return (
    <div className="p-2 pr-10 flex gap-2 border-b border-gray-400 text-gray-700 text-xs xs:text-sm relative animate-slide-in-right">
      <div className="flex-1/6">
        <img
          src={product.image}
          alt={`${product.name} image`}
          className="size-24 object-contain rounded-lg"
        />
      </div>

      <div className="flex-5/6">
        <h3>{product.name}</h3>
        <div className="flex gap-2">
          <p>{product.amount} *</p>
          <p>{formatCurrency(product.price)}</p>
        </div>
        <p className="font-semibold text-lg">
          {formatCurrency(product.amount * product.price)}
        </p>
      </div>

      <div className="absolute top-0 bottom-0 right-0 w-10 flex flex-col items-center justify-around">
        <button
          onClick={handleClickDelete}
          className="text-red-500 hover:scale-110 transition-transform duration-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>

        <button
          onClick={handleClickEdit}
          className="text-indigo-700 hover:scale-110 transition-transform duration-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
