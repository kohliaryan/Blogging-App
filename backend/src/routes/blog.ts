import { Hono } from "hono";

export const blogRouter = new Hono();

blogRouter.post("/", (c) => {
  return c.text("Post Req to Blogs");
});

blogRouter.put("/", (c) => {
  return c.text("Put Req to Blogs");
});

blogRouter.get("/:id", (c) => {
  return c.text("Get Req to Blogs");
});

blogRouter.post("/bulk", (c) => {
  return c.text("Post Req to Blogs");
});
