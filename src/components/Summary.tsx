import { useEffect, useState, type FormEvent } from "react";
import { formatCurrency } from "../helpers";
import { useAppStore } from "../stores/useAppstore";
import { ProductSummary } from "./ProductSummary";
import { useAuthStore } from "../stores/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const orderElements = useAppStore((state) => state.order);
  const orderTotal = useAppStore((state) => state.total);
  const calcTotal = useAppStore((state) => state.calcTotal);
  const placeOrder = useAppStore((state) => state.placeOrder);
  const placingOrder = useAppStore((state) => state.placingOrder);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [orderMessage, setOrderMessage] = useState<null | string>(null);
  // no need for use memo due to zustand render
  const emptyOrder = orderElements.length === 0;

  // calculate order total everytime orderElements changes
  useEffect(() => {
    calcTotal();
  }, [orderElements, calcTotal]);

  const handleOrderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await placeOrder(logout, navigate, setOrderMessage);
  }
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
              <form onSubmit={handleOrderSubmit} noValidate className="animate-popIn">
                <button
                  disabled={placingOrder}
                  className="block w-full p-4 text-center mx-auto max-w-10/12 rounded-lg bg-indigo-700 text-white cursor-pointer font-bold mt-6 hover:opacity-85 transition-opacity duration-500 disabled:opacity-70"
                  type="submit"
                >
                  {placingOrder ? 'Creating order...' : 'Create order'}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="absolute w-full h-full inset-0 flex items-center justify-center font-bold text-xl text-gray-700">
            {orderMessage ? (
              <p className="text-white bg-green-400 p-3 rounded-lg  w-fit text-balance text-center">Your order was successfully created.</p>
            ) : (
              <p className="px-2 text-balance text-center">Your order is empty.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
