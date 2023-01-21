import app, { init } from "@/app";
import dotenv from "dotenv";
dotenv.config();

const PORT = +process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}.`);
  });
});
