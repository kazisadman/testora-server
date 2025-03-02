import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieparser from "cookie-parser";
import connectDb from "./server";

import userRouter from "./modules/user/user.router";



const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/v1", userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
