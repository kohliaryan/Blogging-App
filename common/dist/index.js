"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putReqSchema = exports.postBlogSchema = exports.signinSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.postBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(4),
    content: zod_1.z.string().min(10),
});
exports.putReqSchema = zod_1.z.object({
    id: zod_1.z.string().min(4),
    title: zod_1.z.string().min(10),
});
