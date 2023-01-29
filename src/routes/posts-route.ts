import { createPost, deletePost, getPosts } from "@/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { validateBody, validateParams } from "@/middlewares";
import { createPostSchema } from "@/schemas";

const postsRoute = Router();

postsRoute
    .get("/", getPosts)
    .post("/", authenticateToken, validateBody(createPostSchema),createPost)
    .delete("/", authenticateToken, deletePost)

export default postsRoute;
