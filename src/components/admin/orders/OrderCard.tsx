import { useState } from "react";
import { useAuthStore } from "../../../stores/auth/useAuthStore";
import { useAppStore } from "../../../stores/useAppstore";
import type { OrderType } from "../../../views/admin/Orders"
import SubmitButton from "../../SubmitButton";
import { ProductItem } from "./ProductItem";

type OrderCardProps = {
    order: OrderType
}
export const OrderCard = ({ order }: OrderCardProps) => {
    const completeOrder = useAppStore((state) => state.completeOrder)
    const token = useAuthStore((state) => state.token)

    const [loading, setLoading] = useState(false);

    const handleChangeState = async () => {
        try {
            setLoading(true)
            completeOrder(order.id, token);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="group border border-gray-400 bg-gray-50 p-6 rounded-xl shadow-sm animate-popIn overflow-hidden h-fit">
            <p className="text-lg font-bold text-indigo-700">Order #{order.id}</p>
            <p className="text-md font-semibold text-yellow-600 mb-4">Total: ${order.total.toFixed(2)}</p>

            <h2 className="mt-4 text-md font-bold text-black uppercase">Customer Info</h2>
            <p className="text-gray-700">Name: <span className="font-medium">{order.customer.name}</span></p>
            <p className="text-gray-700">Email: <span className="font-medium">{order.customer.email}</span></p>

            <h2 className="mt-4 text-md font-bold text-black uppercase">Products {order.products.length}</h2>
            <div className="ml-4 mt-4 space-y-4">
                {order.products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
            <SubmitButton
                handleClick={handleChangeState}
                type="button"
                variant="secondary"
                loading={loading}
                loadingText="Completing order..." disabled={loading} >Order Ready</SubmitButton>
        </div>
    );
}