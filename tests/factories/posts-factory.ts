import { faker } from "@faker-js/faker";
import { Post } from "@prisma/client";
import { prisma } from "@/config";

export async function createPost(userId: number): Promise<Post> {

  return prisma.post.create({
    data: {
      userId,
      Title: faker.name.firstName(),
      Content: faker.name.fullName()
    },
  });
}
