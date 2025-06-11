import * as valibot from "valibot";

export const CategorySchema = valibot.object({
  id: valibot.number(),
  name: valibot.string(),
  icon: valibot.string(),
});

export const CategoryResponseSchema = valibot.object({
  data: valibot.array(CategorySchema),
});

export const ProductSchema = valibot.object({
  id: valibot.number(),
  name: valibot.string(),
  price: valibot.number(),
  description: valibot.string(),
  category_id: valibot.number(),
  image: valibot.string(),
  available: valibot.boolean(),
  quantity: valibot.optional(valibot.number()),
  subtotal: valibot.optional(valibot.number()),
});

export const ProductSchemaResponse = valibot.object({
  data: valibot.array(ProductSchema),
});

/////////////// USER LOGIN /////////////////////

// Response after failed user registration
export const LoginUserErrorSchema = valibot.object({
  errors: valibot.object({
    email: valibot.optional(valibot.array(valibot.string())),
    password: valibot.optional(valibot.array(valibot.string())),
  }),
  message: valibot.optional(valibot.string()),
});

// user schema for the endpoint /api/user
export const UserResponseSchema = valibot.object({
  id: valibot.number(),
  name: valibot.string(),
  email: valibot.string(),
  email_verified_at: valibot.optional(valibot.nullable(valibot.string())),
  created_at: valibot.string(),
  updated_at: valibot.string(),
  isadmin: valibot.boolean(),
});

// Success response after user registration
export const LoginUserSuccessSchema = valibot.object({
  success: valibot.boolean(),
  message: valibot.string(),
  token: valibot.string(),
  user: UserResponseSchema,
});

/////////////// USER REGISTRATION /////////////////////

// Response after failed user registration
export const RegisterUserErrorSchema = valibot.object({
  errors: valibot.object({
    name: valibot.optional(valibot.array(valibot.string())),
    email: valibot.optional(valibot.array(valibot.string())),
    password: valibot.optional(valibot.array(valibot.string())),
  }),
  message: valibot.optional(valibot.string()),
});

// Success response after user registration
export const RegisterUserSuccessSchema = valibot.object({
  success: valibot.boolean(),
  message: valibot.string(),
  token: valibot.string(),
  user: UserResponseSchema,
});

////////////////// ORDER RESPONSE /////////////////

export const OrderSchema = valibot.object({
  id: valibot.number(),
  total: valibot.number(),
  state: valibot.boolean(),
  created_at: valibot.string(),
  products: valibot.array(ProductSchema),
  customer: valibot.object({
    id: valibot.number(),
    name: valibot.string(),
    email: valibot.string(),
  }),
});

export const ApiOrderResponseSchema = valibot.object({
  data: valibot.array(OrderSchema),
});

//////// TOGGLE PRODUCT REPONSE ////////

export const ApiToggleProductResponse = valibot.object({
  success: valibot.boolean(),
  product_id: valibot.number(),
  available: valibot.boolean(),
});
