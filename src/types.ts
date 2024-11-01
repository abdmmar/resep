import { z } from "zod";

const numberInString = z.string().transform((val, ctx) => {
	const parsed = Number.parseInt(val);
	if (Number.isNaN(parsed)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Not a number",
		});

		// This is a special symbol you can use to
		// return early from the transform function.
		// It has type `never` so it does not affect the
		// inferred return type.
		return z.NEVER;
	}
	return parsed;
});

export const recipeSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	portions: z.number(),
	ingredients: z.array(
		z.object({
			name: z.string(),
			quantity: numberInString,
			unit: z.string(),
			price: z.number().optional(),
		}),
	),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
