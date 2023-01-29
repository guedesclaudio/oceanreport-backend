import { createPost, deletePost, getPosts } from "@/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { validateBody, validateParams } from "@/middlewares";
import { createPostSchema, deletePostSchema } from "@/schemas";

const postsRouter = Router();

postsRouter
    .get("/", getPosts)
    .post("/", authenticateToken, validateBody(createPostSchema), createPost)
    .delete("/:postId", authenticateToken, validateParams(deletePostSchema), deletePost)

export default postsRouter;
