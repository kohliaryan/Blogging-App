import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";


export const blogRouter = new Hono<{
  Bindings: {
    JWT_Secret: string;
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	console.log("Here")
	try{
	const payload = await verify(token, c.env.JWT_Secret);

		  //@ts-ignore
	c.set('userId', payload.id);
	await next()

	}
	catch{
		return c.json({
			msg: "Invalid Token!"
		}, 401)
	}


})

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
