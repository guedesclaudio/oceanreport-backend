import { prisma } from "@/config";
import { UserData } from "@/types";

async function insertUser(userData: UserData) {
  return prisma.user.create({
    data: { 
      name: userData.name,
      email: userData.email,
      password: userData.password,
      report: userData.report
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
  });
}

async function findUsersWithReport() {
  return prisma.user.findMany({
    select: { email: true },
    where: { report: true }
  });
}

const usersRepository = {
  insertUser,
  findEmail,
  insertSession,
  findUsersWithReport
};

export default usersRepository;
