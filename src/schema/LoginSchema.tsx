import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type Tlogin = z.infer<typeof loginSchema>;

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const regesterSchema = z.object({
  username: z.string().min(5, { message: "username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .max(10, { message: "Password must be less then 10 character)" })
    .min(1, { message: "Password is required" }),
  imageurl: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type Tregister = z.infer<typeof regesterSchema>;
