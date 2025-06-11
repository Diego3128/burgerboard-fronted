import type { Product as ProductType } from "../../../types"
import { ProductAdmin } from "./ProductAdmin"

type OrderListProps = {
    products: ProductType[]
}

export const ProductList = ({ products }: OrderListProps) => {

    if (!products.length) {
        return <p>No products to show.</p>
    }

    return (
        <div className="@container px-3 py-5 mb-20 min-h-[80dvh] max-h-[80dvh] md:max-h-dvh overflow-y-auto">
            <div className="grid @xs:grid-cols-2 @xl:grid-cols-3  @5xl:grid-cols-4">
                {products.map(product => (
                    <ProductAdmin key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
