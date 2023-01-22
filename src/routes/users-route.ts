import { Router } from "express";
import { createUser, loginUser } from "@/controllers";
import { createUserSchema, loginUserSchema } from "@/schemas/users-schema";
import { validateBody } from "@/middlewares/schema-middleware";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(createUserSchema), createUser)
  .post("/signin", validateBody(loginUserSchema), loginUser);

export default usersRouter;
