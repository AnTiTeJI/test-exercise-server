import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";
import path from "path";
import { ApiException } from "../exception/ApiException";
import { Post } from "../models/model";
import { UserModel } from "../models/types";
import { CommentCreateBody, PostCreateBody } from "../types/api";

class PostService {
  async createPost(user: UserModel, body: PostCreateBody, image: UploadedFile) {
    console.log(body);
    image.name = "posts/" + v4() + ".jpg";
    const post = await user.createPost({
      ...body,
      image: image.name,
    });
    await image.mv(path.join("static", image.name));
    return post;
  }
  async findPostById(id: number) {
    return await Post.findByPk(id);
  }
  async findPostsByUser(UserId: number, limit: number, page: number) {
    if (!UserId || !limit || !page)
      throw ApiException.badRequest("Uncorrect params");
    const offset = page * limit - limit;
    const postsDB = await Post.findAndCountAll({
      where: { UserId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
    return postsDB.rows;
  }
  async findPosts(limit: number, page: number) {
    if (!limit || !page) throw ApiException.badRequest("Uncorrect params");
    const offset = page * limit - limit;
    const postsDB = await Post.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
    return postsDB.rows;
  }
  async addComment(post_id: number, comment: CommentCreateBody) {
    const post = await Post.findByPk(post_id);
    if (!post) throw ApiException.notFound();
    post.createComment({ author: comment.author, message: comment.message });
  }
}

export default new PostService();
