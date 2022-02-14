import { compare, hash } from "bcrypt";
import { UploadedFile } from "express-fileupload";
import { UserDTO } from "../dto/User";
import { ApiException } from "../exception/ApiException";
import { decode } from "jsonwebtoken";
import { User } from "../models/model";
import path from "path";
import { UserModel } from "../models/types";
import {
  iTokens,
  UserBody,
  UserChangePassword,
  UserLoginBody,
  UserRegistrationBody,
} from "../types/api";
import tokenService from "./token.service";
import { v4 } from "uuid";

class UserService {
  async findUserByEmail(email: string): Promise<UserModel | null> {
    return await User.findOne({ where: { email } });
  }
  async findUserByTokenId(token: string): Promise<UserModel> {
    if (!token) throw ApiException.unnathorized();
    const user = await User.findByPk((decode(token) as UserDTO).id);
    if (!user) throw ApiException.notFound("User not found");
    else return user;
  }
  async registration(body: UserRegistrationBody): Promise<iTokens> {
    await this.findUserByEmail(body.email).then((user) => {
      if (user) throw ApiException.badRequest("User is registrated");
    });
    const hashPassword = await hash(body.password, 7);
    const user = await User.create({
      nickname: body.nickname,
      email: body.email,
      password: hashPassword,
    });
    const tokens = tokenService.generateTokens(new UserDTO(user));
    user.createToken({ refresh: tokens.refreshToken });
    return tokens;
  }
  async login(body: UserLoginBody): Promise<iTokens> {
    const user = await this.findUserByEmail(body.email);
    if (!user) throw ApiException.badRequest("Uncorrent email or password");
    if (!(await compare(body.password, user.password)))
      throw ApiException.badRequest("Uncorrent email or password");
    const tokens = tokenService.generateTokens(new UserDTO(user));
    const tokenDB = await user.getToken();
    tokenDB.refresh = tokens.refreshToken;
    tokenDB.save();
    return tokens;
  }
  async addImage(user: UserModel, image: UploadedFile) {
    image.name = "users/" + v4() + ".jpg";
    user.image = image.name;
    await image.mv(path.join("static", image.name));
    return user.save();
  }
  async refresh(refreshToken: string | undefined): Promise<iTokens> {
    if (!refreshToken) throw ApiException.forbidden();
    const validToken = tokenService.validateRefreshToken(refreshToken);
    const user = await this.findUserByTokenId(refreshToken);
    if (!validToken || !user) throw ApiException.unnathorized();
    const tokens = tokenService.generateTokens(new UserDTO(user));
    const tokenDB = await user.getToken();
    tokenDB.refresh = tokens.refreshToken;
    tokenDB.save();
    return tokens;
  }
  async changeUserData(user: UserModel, body: UserBody) {
    if (body.nickname && body.nickname != user.nickname)
      user.nickname = body.nickname;
    if (body.email && body.email != user.email) user.email = body.email;
    return user.save();
  }
  async changeUserPass(user: UserModel, body: UserChangePassword) {
    if (body.prevPassword && body.newPassword) {
      if (!(await compare(body.prevPassword, user.password)))
        throw ApiException.badRequest("Previous password is`nt equal");
      const newPassword = await hash(body.newPassword, 7);
      user.password = newPassword;
    }
  }
}

export default new UserService();
