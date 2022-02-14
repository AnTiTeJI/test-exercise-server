import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { ApiException } from "../exception/ApiException";
import { UserDTO } from "../dto/User";
import { UploadedFile } from "express-fileupload";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await userService.registration(req.body);
      res
        .status(201)
        .cookie("refresh", tokens.refreshToken)
        .json({ access: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await userService.login(req.body);
      res
        .status(200)
        .cookie("refresh", tokens.refreshToken)
        .json({ access: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }
  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw ApiException.badRequest();
      const user = await userService.findUserByTokenId(token);
      res.status(200).json({ ...new UserDTO(user) });
    } catch (error) {
      next(error);
    }
  }
  async addImage(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw ApiException.unnathorized();
      const user = await userService.findUserByTokenId(token);
      if (req.files)
        await userService.addImage(user, req.files.image as UploadedFile);
      res.status(200).json({ image: user.image });
    } catch (error) {
      next(error);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await userService.refresh(req.cookies.refresh);
      res
        .status(200)
        .cookie("refresh", tokens.refreshToken)
        .json({ access: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }
  async changeUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw ApiException.unnathorized();
      const userDB = await userService.findUserByTokenId(token);
      const newUser = await userService.changeUserData(userDB, req.body);
      res.status(200).json({ ...new UserDTO(newUser) });
    } catch (error) {
      next(error);
    }
  }
  async ChangeUserPass(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw ApiException.unnathorized();
      const userDB = await userService.findUserByTokenId(token);
      await userService.changeUserPass(userDB, req.body);
      res.status(200).json({ msg: "Success" });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
