import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import database from "./database";
import path from "path";
import "./models/assotiation";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import router from "./router";
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(ErrorMiddleware);

app.listen(port, () => {
  database.sync({
    logging: false,
  });
  console.log("Server started on port:", port);
});
