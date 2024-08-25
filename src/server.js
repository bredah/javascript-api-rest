import express from "express";
import morgan from "morgan";
import mensagemRouter from "./routes/mensagemRouter";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/mensagens", mensagemRouter);

export default app;
