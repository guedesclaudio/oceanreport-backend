import { prisma } from "@/config";
import { Post } from "@/types";

export default class postsRepository {

    async list() {
        return prisma.post.findMany({
            include: {
                User: {
                    select: { name: true }
                }
            }
        });
    }

    async create(postData: Post, userId: number) {
        return prisma.post.create({
            data: { 
                Title: postData.title,
                Content: postData.content,
                userId
            }
        });
    }

    async delete(postId: number) {
        return prisma.post.delete({
            where: { id: postId }
        });
    }

    async find(postId: number) {
        return prisma.post.findUnique({
            where: { id: postId }
        });
    }
}