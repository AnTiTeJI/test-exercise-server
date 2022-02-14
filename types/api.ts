export interface UserLoginBody {
  email: string;
  password: string;
}
export interface UserRegistrationBody extends UserLoginBody {
  nickname: string;
}

export interface UserBody {
  nickname: string;
  email: string;
}

export interface iTokens {
  accessToken: string;
  refreshToken: string;
}

export interface PostCreateBody {
  title: string;
  description: string;
}

export interface PostBody {
  id: number;
  date?: string;
  title: string;
  image?: string;
  UserId?: number;
  author: string;
}
export interface PostDetailBody extends PostBody {
  description: string;
}

export interface CommentCreateBody {
  author: string;
  message: string;
}

export interface UserChangePassword {
  prevPassword: string;
  newPassword: string;
}

export interface PostFullBody extends PostCreateBody {
  post: PostDetailBody;
  comments: CommentCreateBody[];
}
