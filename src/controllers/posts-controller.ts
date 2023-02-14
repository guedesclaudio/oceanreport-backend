import { AuthenticatedRequest, Post } from "@/types";
import { Response, Request } from "express";
import httpStatus from "http-status";
import postsService from "@/services/posts-service";

const posts = new postsService;

export async function getPosts(req: Request, res: Response) {

    try {
        const response = await posts.get();
        return res.status(httpStatus.OK).send(response);
    } catch (error) {
        console.error(error);
    }
}

export async function createPost(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId;
    const postData = req.body as Post;

    try {
        await posts.insert(postData, Number(userId));
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
    }
}

export async function deletePost(req: Request, res: Response) {

    const { postId } = req.params;
    
    try {
        await posts.remove(Number(postId));
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        if (error.name === "PostNotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    }   
}