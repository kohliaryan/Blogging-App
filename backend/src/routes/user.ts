import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_Secret: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
    select: {
      id: true,
    },
  });
  const token = await sign(user, c.env.JWT_Secret);
  return c.json({ token });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return c.json(
      {
        msg: "Invalid Credentials",
      },
      400
    );
  }
  const token = await sign(user, c.env.JWT_Secret);
  return c.json({ token });
});
