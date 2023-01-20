import { duplicatedEmailError } from "@/erros";
import usersRepository from "@/repositories/users-repositories";
import { UserData } from "@/types";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

async function insertUserWithData(userData: UserData): Promise<User> {
  await checkUniqueEmail(userData.email);
  const { password } = userData;
  userData.password = encryptedPassword(password);
  return usersRepository.insertUser(userData);
}

async function checkUniqueEmail(email: string) {
  const userExists = await usersRepository.findEmail(email);
  if (userExists) throw duplicatedEmailError;
}

function encryptedPassword(password: string) {
  return hash(password, 12);
} 

const usersService = {
  insertUserWithData
};

export default usersService;
