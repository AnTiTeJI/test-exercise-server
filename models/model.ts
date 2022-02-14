import database from "../database";
import { DataTypes, ModelAttributes } from "sequelize";
import {
  CommentAttributes,
  CommentModel,
  PostAttributes,
  PostModel,
  TokenAttributes,
  TokenModel,
  UserArttributes,
  UserModel,
} from "./types";

export const User = database.define<UserModel>("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING },
} as ModelAttributes<UserModel, UserArttributes>);

export const Token = database.define<TokenModel>("Token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refresh: { type: DataTypes.TEXT },
} as ModelAttributes<TokenModel, TokenAttributes>);

export const Post = database.define<PostModel>("Post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  image: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT },
} as ModelAttributes<PostModel, PostAttributes>);

export const Comment = database.define<CommentModel>("Comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
} as ModelAttributes<CommentModel, CommentAttributes>);
