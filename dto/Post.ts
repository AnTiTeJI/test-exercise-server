import { PostModel } from "models/types";

export class PostDTO {
  id: number;
  date?: string;
  title: string;
  likes?: number;
  image?: string;
  description?: string;
  constructor(model: PostModel, detail: boolean = false) {
    this.id = model.id;
    this.date = model.createdAt;
    this.title = model.title;
    this.image = model.image;
    if (detail) this.description = model.description;
  }
}
