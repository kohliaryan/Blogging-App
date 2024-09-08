import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});

export type SignupInput = z.infer<typeof signUpSchema>;

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SigninInput = z.infer<typeof signinSchema>;

export const postBlogSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(10),
});

export type postBlogInput = z.infer<typeof postBlogSchema>;

export const putReqSchema = z.object({
  id: z.string().min(4),
  title: z.string().min(10),
});

export type PutreqInput = z.infer<typeof putReqSchema>;
