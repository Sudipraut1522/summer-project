import * as z from "zod";
const MAX_FILE_SIZE = 50000;

export const videoSchema = z.object({
  teachername: z.string().min(5, { message: "teacher is required" }),
  title: z.string().min(5, { message: "Title is required" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`),

  description: z.string().min(10, { message: "video description in required" }),
});

export type Tvideo = z.infer<typeof videoSchema>;
