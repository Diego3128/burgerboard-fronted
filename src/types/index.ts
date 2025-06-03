import { type InferOutput } from "valibot";

import type {
  CategorySchema,
  ProductSchema,
  UserResponseSchema,
} from "../schemas";

export type CategoryItem = InferOutput<typeof CategorySchema>;

// full product details
export type Product = InferOutput<typeof ProductSchema>;
// product  for the cart
export type ProductInfo = Product & {
  amount: number;
};

// user schema

export type User = InferOutput<typeof UserResponseSchema>;
