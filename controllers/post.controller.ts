import { PostDTO } from "../dto/Post";
import { Request, Response, NextFunction } from "express";
import { ApiException } from "../exception/ApiException";
import postService from "../services/post.service";
import userService from "../services/user.service";
import { UploadedFile } from "express-fileupload";
import { User } from "../models/model";
import { CommentCreateBody, PostBody, PostFullBody } from "types/api";

class PostController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw ApiException.unnathorized();
      const user = await userService.findUserByTokenId(token);
      if (req.files)
        await postService.createPost(
          user,
          req.body,
          req.files.image as UploadedFile
        );
      res.status(201).json("Success");
    } catch (error) {
      next(error);
    }
  }
  async getDetailPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comments: CommentCreateBody[] = [];
      const post = await postService.findPostById(Number(id));
      if (!post) throw ApiException.notFound("Post not found");
      const user = await User.findByPk(post.UserId);
      const commentsDB = await post.getComments();
      for (const comment of commentsDB)
        comments.push({ author: comment.author, message: comment.message });
      res.status(200).json({
        post: { ...new PostDTO(post, true), author: user?.nickname },
        comments,
      } as PostFullBody);
    } catch (error) {
      next(error);
    }
  }
  async getUserPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;
      const posts = await postService.findPostsByUser(
        Number(id),
        Number(limit),
        Number(page)
      );
      let postsDTO: PostDTO[] = [];
      for (let post of posts) postsDTO.push(new PostDTO(post));
      res.status(200).json([...postsDTO]);
    } catch (error) {
      next(error);
    }
  }
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;
      const posts = await postService.findPosts(Number(limit), Number(page));
      let postsDTO: PostDTO[] = [];
      let index: number = 0;
      for (let post of posts) {
        postsDTO.push(new PostDTO(post) as PostBody);
        const user = await User.findByPk(post.UserId);
        if (user) (postsDTO[index] as PostBody).author = user.nickname;
        index++;
      }
      res.status(200).json([...postsDTO]);
    } catch (error) {
      next(error);
    }
  }
  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      await postService.addComment(Number(id), req.body as CommentCreateBody);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
