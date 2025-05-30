import { products } from "../data/products";
import { axiosClient } from "../config/axios";
import type { CategoryItem, Product } from "../types";
import { parse } from "valibot";
import { CategoryResponseSchema } from "../schemas";

export const fetchProducts = (): Product[] => {
  return products;
};

export const fetchCategories = async (
  signal: AbortSignal
): Promise<CategoryItem[]> => {
  const URL = `/api/categories`;
  try {
    const data = await axiosClient.get(URL, { signal });
    // validate reponse
    const result = parse(CategoryResponseSchema, data.data);
    return result.data;
  } catch (error) {
    // console.error(error);
    throw new Error("Error fetching the categories");
  }
};
