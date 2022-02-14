import {
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  Model,
  Optional,
} from "sequelize";

export interface UserArttributes {
  id: number;
  nickname: string;
  email: string;
  image?: string;
  password: string;
}
interface UserCreationAttributes extends Optional<UserArttributes, "id"> {}
export interface UserModel
  extends Model<UserArttributes, UserCreationAttributes>,
    UserArttributes {
  getToken: HasOneGetAssociationMixin<TokenModel>;
  createToken: HasOneCreateAssociationMixin<TokenModel>;
  getPosts: HasManyGetAssociationsMixin<PostModel>;
  getCountPosts: HasManyCountAssociationsMixin;
  createPost: HasManyCreateAssociationMixin<PostModel>;
  removePost: HasManyRemoveAssociationMixin<PostModel, "id">;
}

export interface TokenAttributes {
  id: number;
  refresh: string;
}
interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}
export interface TokenModel
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

export interface PostAttributes {
  id: number;
  title: string;
  image?: string;
  description: string;
  UserId?: number;
  createdAt?: string;
}
interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}
export interface PostModel
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {
  createComment: HasManyCreateAssociationMixin<CommentModel>;
  getComments: HasManyGetAssociationsMixin<CommentModel>;
}

export interface CommentAttributes {
  id: number;
  author: string;
  message: string;
}
interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}
export interface CommentModel
  extends Model<CommentAttributes, CommentCreationAttributes>,
    CommentAttributes {}
