import z from "zod";

export const searchSchema = z.object({
  search: z
    .string({
      required_error: "Artist name is required",
      invalid_type_error: "Invalid input type",
      description: "Artist name",
    })
    .min(2, "Artist name must be at least 2 characters")
    .max(40, "Artist name must be at most 40 characters")
    .trim(),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export async function searchValidation(request: Request) {
  const formData = await request.formData();
  const search = await formData.get("s");
  const body = Object.fromEntries(formData.entries());
  try {
    const _formData = searchSchema.parse(body);
    return { formData: _formData, search, error: null };
  } catch (error) {
    return { formData: null, error };
  }
}
