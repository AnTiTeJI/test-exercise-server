import userController from "../controllers/user.controller";
import { Router } from "express";
import { userRoutes } from "./routes";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const userRouter = Router();

userRouter.get(userRoutes.refresh, AuthMiddleware, userController.refresh);
userRouter.get(
  userRoutes.getUserDetails,
  AuthMiddleware,
  userController.getUserDetails
);
userRouter.post(userRoutes.registration, userController.registration);
userRouter.post(userRoutes.login, userController.login);
userRouter.post(userRoutes.addImage, AuthMiddleware, userController.addImage);
userRouter.put(
  userRoutes.changeUserData,
  AuthMiddleware,
  userController.changeUserData
);
userRouter.put(
  userRoutes.changeUserPass,
  AuthMiddleware,
  userController.ChangeUserPass
);

export default userRouter;
