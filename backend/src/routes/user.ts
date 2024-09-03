import { Hono } from "hono";

export const userRouter = new Hono();

userRouter.get("/signup", (c) => {
  return c.text("Sign Up");
});

userRouter.get("/signin", (c) => {
  return c.text("Sign In");
});
