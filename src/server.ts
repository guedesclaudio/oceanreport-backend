import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { loadEnvs } from "@/config";
import axios from "axios";

loadEnvs();

const server = express();
const PORT = process.env.PORT || 4000;

server
  .use(cors())
  .use(express.json());

server.get("/wave", async (req: any, res: any) => {
  try {
    const url = "https://simcosta.furg.br/api/oceanic_data?boiaID=12&type=json&time1=1673924400&time2=1674097200&params=Hsig_Significant_Wave_Height_m";
    const promise = await axios.get(url);
    console.log(promise);
    return res.send(promise);
  } catch (error) {
    console.error(error);
  }
});

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`));
