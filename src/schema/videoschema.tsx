import * as z from "zod";
const MAX_FILE_SIZE = 5000;

export const videoSchema = z.object({
  teachername: z.string().min(5, { message: "teacher is required" }),
  title: z.string().min(5, { message: "Title is required" }),
  url: z.string().url().optional(),
  description: z.string().min(10, { message: " required more the 10 latter" }),
});

export type Tvideo = z.infer<typeof videoSchema>;
