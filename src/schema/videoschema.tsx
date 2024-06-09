import * as z from "zod";
const MAX_FILE_SIZE = 5000000;
const MAX_FILE_SIZE_VIDEO = 20 * 1024 * 1024; // 20MB in bytes
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"]; // Accept all video MIME types

export const videoSchema = z.object({
  teachername: z.string().min(5, { message: "teacher is required" }),
  title: z.string().min(5, { message: "Title is required" }),
  category: z.string().min(1, { message: "category is required" }),
  subCategory: z.string().min(1, { message: "subCategory is required" }),

  videourl: z
    .any()
    .refine(
      (files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      "Only .mp4 and .webm formats are supported."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE_VIDEO,
      `Max video size is 5MB.`
    )
    .optional(),

  description: z.string().min(10, { message: " required more the 10 latter" }),
});

export type Tvideo = z.infer<typeof videoSchema>;
// const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const someSchema = z.object({
//   image: z
//     .any()
//     .refine(
//       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//       `Max image size is 5MB.`
//     )
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       "Only .jpg, .jpeg, .png and .webp formats are supported."
//     ),
// });
