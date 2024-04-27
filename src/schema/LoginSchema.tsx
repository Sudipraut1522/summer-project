import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type Tlogin = z.infer<typeof loginSchema>;

export const regesterSchema = z.object({
  username: z.string().min(5, { message: "username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type Tregister = z.infer<typeof regesterSchema>;
