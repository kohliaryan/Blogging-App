import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export type SignupInput = z.infer<typeof signUpSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinSchema>;
export declare const postBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type postBlogInput = z.infer<typeof postBlogSchema>;
export declare const putReqSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
}, {
    title: string;
    id: string;
}>;
export type PutreqInput = z.infer<typeof putReqSchema>;
