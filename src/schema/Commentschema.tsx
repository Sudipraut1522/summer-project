import * as z from "zod";

export const commentSchema = z.object({
  comment: z
    .string()
    .max(25, { message: "Comment should be max 25  charcater" }),
});
export type Tcomment = z.infer<typeof commentSchema>;
