import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserData, UserDataLogin } from "@/types";
import usersService from "@/services/users-service";

export async function createUser(req: Request, res: Response) {
  const userData = req.body
  delete userData.confirmPassword;

  try {
    await usersService.insertUserWithData(userData as UserData);
    return res.status(httpStatus.CREATED).send({ message: "user created" });
  } catch (error) {
    console.log(error);
    if (error.name === "duplicatedEmailError") return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function loginUser(req: Request, res: Response) {
  const userDataLogin = req.body as UserDataLogin;

  try {
    const response = await usersService.loginUser(userDataLogin);
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    console.log(error)
    if (error.name === "LoginInvalidInformations") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
