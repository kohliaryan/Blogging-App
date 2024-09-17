import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinSchema, signUpSchema } from "@aryankohli/blogapp-common";

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
  const response = signUpSchema.safeParse(body);

  if (!response.success) {
    return c.json(
      {
        msg: "Invalid Inputs",
      },
      400
    );
  }
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (user) {
    return c.json(
      {
        msg: "User Already Exsists",
      },
      400
    );
  }
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
    select: {
      id: true,
    },
  });
  const token = await sign(newUser, c.env.JWT_Secret);
  return c.json({ token });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const response = signinSchema.safeParse(body);
  if (!response.success) {
    return c.json(
      {
        msg: "Invalid Email/Password",
      },
      400
    );
  }
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
        msg: "Wrong Email/password",
      },
      400
    );
  }
  const token = await sign(user, c.env.JWT_Secret);
  return c.json({ token });
});
