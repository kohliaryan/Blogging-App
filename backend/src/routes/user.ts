import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

userRouter.post("/signup",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()

  await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    }
  })

  return c.text("Sign Up");
});

userRouter.get("/signin", (c) => {
  return c.text("Sign In");
});
