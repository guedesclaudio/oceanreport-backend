import { Router } from "express";
import { createUser } from "@/controllers";
import { createUserSchema } from "@/schemas/users-schema";
import { validateBody } from "@/middlewares/schema-middleware";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(createUserSchema), createUser);

export default usersRouter;
