import { useEffect } from "react";
import { formatCurrency } from "../helpers";
import { useAppStore } from "../stores/useAppstore";
import { ProductSummary } from "./ProductSummary";

export const Summary = () => {
  const orderElements = useAppStore((state) => state.order);
  const orderTotal = useAppStore((state) => state.total);
  const calcTotal = useAppStore((state) => state.calcTotal);

  // no need for use memo due to zustand render
  const emptyOrder = orderElements.length === 0;

  // calculate order total everytime orderElements changes
  useEffect(() => {
    calcTotal();
  }, [orderElements]);

  return (
    <>
      <h2 className=" px-4 font-bold text-2xl md:text-3xl text-gray-700 mb-5">
        Your order
      </h2>

      <p className="px-4 text-gray-700 font-semibold text-xl border-b-2 border-b-gray-400 pb-5">
        Here you can see the details and total of your order.
      </p>

      {/* order details */}
      <div className=" min-h-[70dvh] relative">
        {orderElements.length ? (
          <div className="overflow-hidden">
            {orderElements.map((element) => (
              <ProductSummary key={element.id} product={element} />
            ))}
            <p className="mt-2 pl-3 font-bold text-gray-700 text-lg">Total: {formatCurrency(orderTotal)}</p>
            {!emptyOrder && (
              <form noValidate className="animate-popIn">
                <button
                  className="block w-full p-4 text-center mx-auto max-w-10/12 rounded-lg bg-indigo-700 text-white cursor-pointer font-bold mt-6 hover:opacity-85 transition-opacity duration-500"
                  type="submit"
                >
                  Send order
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="absolute w-full h-full inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
            <p>Your order is empty.</p>
          </div>
        )}
      </div>
    </>
  );
};
