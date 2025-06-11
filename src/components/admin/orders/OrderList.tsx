import type { OrderType } from "../../../views/admin/Orders"
import { OrderCard } from "./OrderCard"

type OrderListProps = {
    orders: OrderType[]
}

export const OrderList = ({ orders }: OrderListProps) => {

    if (!orders.length) {
        return <p>No orders yet.</p>
    }

    return (
        <div className="@container px-3 mb-20">
            <div className="grid gap-4 @lg:grid-cols-2 @4xl:grid-cols-3">
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}
