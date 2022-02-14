import postController from "../controllers/post.controller";
import { Router } from "express";
import { postRoutes } from "./routes";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userRouter = Router();

userRouter.get(postRoutes.getPosts, postController.getPosts);
userRouter.get(
  postRoutes.getUserPosts,
  AuthMiddleware,
  postController.getUserPosts
);
userRouter.get(postRoutes.getPostDetail, postController.getDetailPost);
userRouter.post(
  postRoutes.createPost,
  AuthMiddleware,
  postController.createPost
);
userRouter.post(postRoutes.addComment, postController.addComment);
export default userRouter;
