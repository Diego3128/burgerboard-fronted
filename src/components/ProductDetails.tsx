import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers";
import { useAppStore } from "../stores/useAppstore";

export const ProductDetails = () => {
  const activeProduct = useAppStore((state) => state.activeProduct);
  const orderProducts = useAppStore((state) => state.order);

  const addToCart = useAppStore((state) => state.addToCart);

  const MAX = 10;
  const MIN = 1;

  const [amount, setAmount] = useState(1);
  const [existingProduct, setExistingProduct] = useState(false);

  // check if the activeProduct exists in the order array to set the amount state.
  useEffect(() => {
    if (activeProduct) {
      const exists = orderProducts.some((p) => p.id === activeProduct.id);
      if (exists) {
        const product = orderProducts.find((p) => p.id === activeProduct.id);
        if (product) {
          setAmount(product.amount);
          setExistingProduct(true);
        }
      }
    }
  }, [activeProduct]);

  const increment = () => {
    if (amount >= MAX) return;
    setAmount((prev) => prev + 1);
  };
  const decrement = () => {
    if (amount <= MIN) return;
    setAmount((prev) => prev - 1);
  };

  return activeProduct ? (
    <div className="mx-auto mt-12 w-10/12 max-w-4xl bg-gradient-to-bl from-gray-100 via-yellow-50 to-gray-300 p-4 rounded-xl sm-480:flex sm-480:gap-3 sm-480:justify-between">
      <div className="sm-480:flex-2/5 ">
        <img
          className="rounded-xl animate-glow duration-700 mx-auto "
          src={`/img/${activeProduct.image}.jpg`}
          alt={`${activeProduct.name} image`}
        />
      </div>

      <div className="sm-480:flex-3/5 sm-480:px-4 space-y-4 font-semibold">
        <p className="font-bold text-gray-700 text-balance text-lg sm:text-xl mt-4 sm-480:mt-0">
          {activeProduct.name}
        </p>
        <p className=" w-fit mt-6 rounded-2xl p-2 text-gray-100 bg-green-400 text-center -top-1 -left-2.5   transition-transform duration-700 md:text-lg">
          {formatCurrency(activeProduct.price)}
        </p>

        {/* options */}

        <div className="flex justify-between items-center gap-2 bg-indigo-700 text-white rounded-xl p-2 w-24">
          <button onClick={decrement}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer hover:opacity-85"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <p>{amount}</p>
          <button onClick={increment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer hover:opacity-85"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => addToCart({ ...activeProduct, amount: amount })}
          className="group bg-yellow-300 text-gray-800 text-center p-4 rounded-xl hover:scale-110 transition-transform duration-500 flex justify-between items-center gap-2 cursor-pointer"
        >
          <span className="font-bold">{existingProduct ? 'Save changes' : 'Add to cart'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 group-hover:scale-105 group-hover:translate-x-1 transition-transform duration-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};
