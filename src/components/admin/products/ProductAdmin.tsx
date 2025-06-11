import { useState } from "react";
import { formatCurrency } from "../../../helpers";
import { useAuthStore } from "../../../stores/auth/useAuthStore";
import { useAppStore } from "../../../stores/useAppstore";
import type { Product as ProductT } from "../../../types";

interface ProductType {
    product: ProductT;
}
export const ProductAdmin = ({ product }: ProductType) => {
    const token = useAuthStore((state) => state.token);

    const toggleProduct = useAppStore((state) => state.toggleProduct);

    const available = product.available;

    const [toggling, setToggling] = useState(false);

    const handleToggle = async () => {
        try {
            setToggling(true);
            await toggleProduct(product.id, token!)
        } catch (e) {
            console.error(e)
        } finally {
            setToggling(false);
        }
    }

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
                {/* product options*/}
                <div className="absolute -top-4 left-0 w-full flex items-center justify-end z-20">

                    <button
                        disabled={toggling}
                        onClick={handleToggle}
                        title={available ? 'pause product' : 'activate product'}
                        className={`${available ? 'bg-gray-300' : 'bg-yellow-300'} rounded-lg p-1.5 text-sm group-hover:-translate-y-2 group-hover:-translate-x-1 transition-transform duration-300 hover:contrast-150 cursor-pointer hover:scale-110 animate-popIn disabled:cursor-not-allowed`}
                    >
                        {available ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        )}
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
