import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserData } from "@/types";
import usersService from "@/services/users-service";

export async function createUser(req: Request, res: Response) {
  const userData = req.body as UserData;

  try {
    await usersService.insertUserWithData(userData);
    return res.status(httpStatus.OK).send({ message: "user created" });
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(req: Response, res: Response) {
  
}