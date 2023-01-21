import { prisma } from "@/config";
import { UserData } from "@/types";

async function insertUser(userData: UserData) {
  return prisma.user.create({
    data: { 
      name: userData.name,
      email: userData.email,
      password: userData.password
    }
  });
}

async function findEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}

async function insertSession(userId: number, token: string) {
  return prisma.session.create({
    data: {
      userId,
      token
    }
  })
}

const usersRepository = {
  insertUser,
  findEmail,
  insertSession
};

export default usersRepository;
