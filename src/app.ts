import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loadEnvs } from "@/config";
import { reportRouter } from "@/routes";
dotenv.config();
loadEnvs();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/report", reportRouter);


export function init(): Promise<Express> {
  //connectDb();
  return Promise.resolve(app);
}
  
export async function close(): Promise<void> {
  //await disconnectDB();
}
  
export default app;
