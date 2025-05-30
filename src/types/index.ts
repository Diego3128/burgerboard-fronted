import {type InferOutput} from "valibot";

import type { CategorySchema } from "../schemas";

export type CategoryItem = InferOutput<typeof CategorySchema>;

// full product details
export type Product = {
  name: string;
  price: number;
  image: string;
  category_id: number;
  id: number;
};
// product  for the cart
export type ProductInfo = Product & {
  amount: number;
};
