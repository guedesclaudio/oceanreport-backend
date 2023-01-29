import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loadEnvs, connectDb, disconnectDB } from "@/config";
import reportRouter from "./routes/report-route";
import usersRouter from "./routes/users-route";
import postsRouter from "./routes/posts-route";
dotenv.config();
loadEnvs();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/report", reportRouter)
  .use("/users", usersRouter)
  .use("/posts", postsRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}
  
export async function close(): Promise<void> {
  await disconnectDB();
}
  
export default app;
