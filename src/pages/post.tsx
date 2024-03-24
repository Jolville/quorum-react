import { useSuspenseQuery } from "@apollo/client";
import * as uuid from "uuid";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";

export function Post() {
  const { postId } = useParams();
  if (!postId || !uuid.validate(postId)) {
    throw new Error("expected postId to be a uuid");
  }
  const { data } = useSuspenseQuery(
    graphql(`
      query PostPage($postId: UUID!) {
        post(id: $postId) {
          id
        }
      }
    `),
    {
      variables: {
        postId,
      },
    }
  );
  return (
    <p className="font-normal">
      {postId}: {data.post?.id}
    </p>
  );
}
