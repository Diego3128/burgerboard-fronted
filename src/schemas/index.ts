import * as valibot from "valibot";

export const CategorySchema = valibot.object({
  id: valibot.number(),
  name: valibot.string(),
  icon: valibot.string(),
});

export const CategoryResponseSchema = valibot.object({
  data: valibot.array(CategorySchema),
});
