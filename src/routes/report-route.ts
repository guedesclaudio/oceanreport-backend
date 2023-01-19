import { Router } from "express";
import { getReport } from "@/controllers";

const reportRouter = Router();

reportRouter
  .use("/", getReport);

export { reportRouter };
