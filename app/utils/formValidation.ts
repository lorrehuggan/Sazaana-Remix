import z from "zod";

/* Creating a schema for the search input. */
export const searchSchema = z.object({
  artist: z
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
