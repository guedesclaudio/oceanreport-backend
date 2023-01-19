import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loadEnvs } from "@/config";
import { reportRouter } from "@/routes";
dotenv.config();
loadEnvs();

const server = express();
const PORT = process.env.PORT || 4000;

server
  .use(cors())
  .use(express.json())
  .use("/report", reportRouter);

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`));
