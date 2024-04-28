const routes = {
  root: "/",
  profile: "/profile",
  login: "/login",
  welcome: "/welcome",
  verify: "/verify",
  post: {
    path: "/post/:postId",
    id(id: string) {
      return `/post/${id}`;
    },
  },
};

export default routes;
