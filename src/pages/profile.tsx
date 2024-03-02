import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "../gql";

export function Profile() {
  const { data } = useSuspenseQuery(
    graphql(`
      query ProfilePage {
        customer {
          id
          firstName
        }
      }
    `)
  );
  if (data.customer) {
    return <>Hello, {data.customer.firstName}!</>;
  }
  return <>Not logged in</>;
}
