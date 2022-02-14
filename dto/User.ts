import { UserModel } from "models/types";

export class UserDTO {
  id: number;
  nickname: string;
  email: string;
  image: string;
  constructor(model: UserModel) {
    this.id = model.id;
    this.email = model.email;
    this.nickname = model.nickname;
    this.image = model.image || "";
  }
}
