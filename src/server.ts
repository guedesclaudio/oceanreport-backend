import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const server = express();
const PORT = process.env.PORT || 400;

server
    .use(cors())
    .use(express.json());

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`));