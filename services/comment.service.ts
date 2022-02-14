import { PostModel } from "models/types";
import { CommentCreateBody } from "types/api";

class CommentService {
  async createComment(post: PostModel, body: CommentCreateBody) {
    return await post.createComment(body);
  }
}

export default new CommentService();
