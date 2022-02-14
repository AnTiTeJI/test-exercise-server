export const userRoutes = {
  refresh: "/refresh",
  getUserDetails: "/user",
  registration: "/registration",
  login: "/login",
  addImage: "/user/image",
  changeUserData: "/user/change/data",
  changeUserPass: "/user/change/pass",
};

export const postRoutes = {
  createPost: "/create",
  getPosts: "/",
  getUserPosts: "/:id",
  getPostDetail: "/post/:id",
  addComment: "/post/:id/comment",
};
