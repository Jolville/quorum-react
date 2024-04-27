/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query PostPage($postId: UUID!) {\n        customer {\n          id\n          firstName\n          lastName\n        }\n        post(id: $postId) {\n          id\n        }\n      }\n    ": types.PostPageDocument,
    "\n      mutation GenerateSignedPostOptionUrl(\n        $input: GenerateSignedPostOptionUrInput!\n      ) {\n        generateSignedPostOptionUrl(input: $input) {\n          url\n          bucketName\n          fileKey\n          errors {\n            ... on BaseError {\n              message\n            }\n          }\n        }\n      }\n    ": types.GenerateSignedPostOptionUrlDocument,
    "\n      query ProfilePage {\n        customer {\n          id\n          firstName\n        }\n      }\n    ": types.ProfilePageDocument,
    "\n            mutation VerifyCustomerToken($input: VerifyCustomerTokenInput!) {\n              verifyCustomerToken(input: $input) {\n                customer {\n                  id\n                }\n                newToken\n                errors {\n                  ... on BaseError {\n                    message\n                  }\n                }\n              }\n            }\n          ": types.VerifyCustomerTokenDocument,
    "\n      query WelcomePage {\n        customer {\n          id\n        }\n      }\n    ": types.WelcomePageDocument,
    "\n        mutation SignUp($input: SignUpInput!) {\n          signUp(input: $input) {\n            errors {\n              ... on BaseError {\n                message\n              }\n            }\n          }\n        }\n      ": types.SignUpDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query PostPage($postId: UUID!) {\n        customer {\n          id\n          firstName\n          lastName\n        }\n        post(id: $postId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query PostPage($postId: UUID!) {\n        customer {\n          id\n          firstName\n          lastName\n        }\n        post(id: $postId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation GenerateSignedPostOptionUrl(\n        $input: GenerateSignedPostOptionUrInput!\n      ) {\n        generateSignedPostOptionUrl(input: $input) {\n          url\n          bucketName\n          fileKey\n          errors {\n            ... on BaseError {\n              message\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation GenerateSignedPostOptionUrl(\n        $input: GenerateSignedPostOptionUrInput!\n      ) {\n        generateSignedPostOptionUrl(input: $input) {\n          url\n          bucketName\n          fileKey\n          errors {\n            ... on BaseError {\n              message\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query ProfilePage {\n        customer {\n          id\n          firstName\n        }\n      }\n    "): (typeof documents)["\n      query ProfilePage {\n        customer {\n          id\n          firstName\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            mutation VerifyCustomerToken($input: VerifyCustomerTokenInput!) {\n              verifyCustomerToken(input: $input) {\n                customer {\n                  id\n                }\n                newToken\n                errors {\n                  ... on BaseError {\n                    message\n                  }\n                }\n              }\n            }\n          "): (typeof documents)["\n            mutation VerifyCustomerToken($input: VerifyCustomerTokenInput!) {\n              verifyCustomerToken(input: $input) {\n                customer {\n                  id\n                }\n                newToken\n                errors {\n                  ... on BaseError {\n                    message\n                  }\n                }\n              }\n            }\n          "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query WelcomePage {\n        customer {\n          id\n        }\n      }\n    "): (typeof documents)["\n      query WelcomePage {\n        customer {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation SignUp($input: SignUpInput!) {\n          signUp(input: $input) {\n            errors {\n              ... on BaseError {\n                message\n              }\n            }\n          }\n        }\n      "): (typeof documents)["\n        mutation SignUp($input: SignUpInput!) {\n          signUp(input: $input) {\n            errors {\n              ... on BaseError {\n                message\n              }\n            }\n          }\n        }\n      "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;