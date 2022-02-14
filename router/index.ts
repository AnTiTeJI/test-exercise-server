import { Router } from "express";
import postRouter from "./post.router";
import userRouter from "./user.router";

const router = Router();

router.use("/", userRouter);
router.use("/posts", postRouter);

export default router;
