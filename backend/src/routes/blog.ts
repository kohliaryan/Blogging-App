import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_Secret);
    console.log(payload);
    // @ts-ignore
    c.set("userId", payload.id);
    await next();
  } catch {
    return c.json(
      {
        msg: "Invalid Token!",
      },
      401
    );
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const post = await prisma.post.create({
      data: {
        authorId: Number(c.get("userId")),
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      msg: "Post created Succesfully",
      id: post.id,
    });
  } catch {
    return c.json(
      {
        msg: "Prisma Client error, try after some time",
      },
      500
    );
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  await prisma.post.update({
    where: {
      id: body.id,
      authorId: Number(c.get("userId")),
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    msg: "Updated Successfully",
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.post.findMany({});
  return c.json({ posts });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = Number(c.req.param("id"));
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  return c.json({ post });
});
