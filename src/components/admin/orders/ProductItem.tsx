import { formatCurrency } from "../../../helpers";
import type { Product } from "../../../types"

type ProductItemProps = {
    product: Product
}
export const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="bg-white border-l-4 border-yellow-500 group-hover:shadow-amber-400 transition-shadow duration-500 p-4 rounded-md shadow-sm animate-slide-in-right">
            <p className="text-gray-800 font-semibold"><span className="text-black">{product.name}</span></p>
            <p className="text-gray-700">Price: <span className="text-indigo-600 font-medium">{formatCurrency(product.price)}</span></p>
            <p className="text-gray-700">Quantity: <span className="text-indigo-600 font-medium">{product.quantity}</span></p>
            <p className="text-gray-700">Subtotal: <span className="text-yellow-600 font-bold">{formatCurrency(product?.subtotal ?? 0)}</span></p>
        </div>
    );
}