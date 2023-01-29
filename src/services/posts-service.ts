import postsRepository from "@/repositories/posts-repository";
import { Post } from "@/types";
import { postNotFoundError } from "@/erros/post-not-found-error";

const posts = new postsRepository;

export default class postsService {

    async get() {
        return posts.list();
    }

    async insert(postData: Post, userId: number) {
        return posts.create(postData, userId);
    }

    async remove(postId: number) {
        const postExists = await posts.find(postId);
        if (!postExists) throw postNotFoundError();
        return posts.delete(postId);
    }
}