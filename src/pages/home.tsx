import { useNavigate } from "react-router-dom";
import * as uuid from "uuid";
import { Button, Typography } from "../components";
import routes from "../routes";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start w-full space-y-4">
      <Typography size="l" element="h" style="bold">
        [TODO] create the home page
      </Typography>
      <Typography size="xs" element="h" className="mb-4">
        Here are some pages in the mean time.
      </Typography>
      <Button onClick={() => navigate(routes.login)}>Login</Button>
      <Button onClick={() => navigate(routes.post.id(uuid.v4()))}>
        New Post
      </Button>
      <Button onClick={() => navigate(routes.profile)}>Profile</Button>
      <Button onClick={() => navigate(routes.welcome)}>Welcome</Button>
      <Button onClick={() => navigate(routes.verify)}>Verify</Button>
    </div>
  );
}
