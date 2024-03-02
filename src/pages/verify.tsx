import { useApolloClient } from "@apollo/client";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphql } from "../gql";
import routes from "../routes";

export function Verify() {
  const [searchParams] = useSearchParams();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const isVerifying = useRef(false);
  const returnTo = searchParams.get("returnTo") || "/profile";
  const token = searchParams.get("token");

  if (!token) {
    throw new Error("expected token to be defined");
  }

  useEffect(() => {
    if (isVerifying.current) {
      return;
    }
    isVerifying.current = true;
    apolloClient
      .mutate({
        mutation: graphql(
          `
            mutation VerifyCustomerToken($input: VerifyCustomerTokenInput!) {
              verifyCustomerToken(input: $input) {
                customer {
                  id
                }
                newToken
                errors {
                  ... on BaseError {
                    message
                  }
                }
              }
            }
          `
        ),
        variables: {
          input: {
            token,
          },
        },
      })
      .then(({ data }) => {
        if (data?.verifyCustomerToken.errors.length) {
          alert(
            "Error: " +
              data.verifyCustomerToken.errors.map((e) => e.message).join(", ")
          );
        }
        if (!data?.verifyCustomerToken.newToken) {
          // should not get here, we can just ask for login again...
          return navigate(routes.login);
        }
        window.localStorage.setItem(
          "token",
          data?.verifyCustomerToken.newToken
        );
        return navigate(returnTo);
      });
  }, []);

  return <>Verifing...</>;
}
