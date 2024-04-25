/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type BaseError = {
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type ClosesAtNotAfterOpensAtError = BaseError & {
  __typename?: 'ClosesAtNotAfterOpensAtError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type Customer = {
  __typename?: 'Customer';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  profession?: Maybe<Scalars['String']['output']>;
};

export type CustomerNotFoundError = BaseError & {
  __typename?: 'CustomerNotFoundError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type DesignPhase =
  | 'HI_FI'
  | 'LO_FI'
  | 'WIREFRAME';

export type ErrPostNotOwned = BaseError & {
  __typename?: 'ErrPostNotOwned';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type GenerateSignedPostOptionUrInput = {
  contentType: Scalars['String']['input'];
  /**
   * Generates a url to upload the file too based off this filename.
   * The name is ignored, but the extension is not.
   */
  fileName: Scalars['String']['input'];
};

export type GenerateSignedPostOptionUrlError = UnauthenticatedError | UnsupportedFileTypeError;

export type GenerateSignedPostOptionUrlPayload = {
  __typename?: 'GenerateSignedPostOptionUrlPayload';
  bucketName: Scalars['String']['output'];
  errors: Array<GenerateSignedPostOptionUrlError>;
  fileKey: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetLoginLinkError = CustomerNotFoundError | InvalidEmailError | InvalidReturnToError;

export type GetLoginLinkInput = {
  email: Scalars['String']['input'];
  returnTo: Scalars['String']['input'];
};

export type GetLoginLinkPayload = {
  __typename?: 'GetLoginLinkPayload';
  errors: Array<GetLoginLinkError>;
};

export type InvalidEmailError = BaseError & {
  __typename?: 'InvalidEmailError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type InvalidReturnToError = BaseError & {
  __typename?: 'InvalidReturnToError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type LinkExpiredError = BaseError & {
  __typename?: 'LinkExpiredError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  generateSignedPostOptionUrl: GenerateSignedPostOptionUrlPayload;
  getLoginLink: GetLoginLinkPayload;
  signUp: SignUpPayload;
  upsertPost: UpsertPostPayload;
  verifyCustomerToken: VerifyCustomerTokenPayload;
};


export type MutationGenerateSignedPostOptionUrlArgs = {
  input: GenerateSignedPostOptionUrInput;
};


export type MutationGetLoginLinkArgs = {
  input: GetLoginLinkInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpsertPostArgs = {
  input: UpsertPostInput;
};


export type MutationVerifyCustomerTokenArgs = {
  input: VerifyCustomerTokenInput;
};

export type OpensAtAlreadyPassedError = BaseError & {
  __typename?: 'OpensAtAlreadyPassedError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<Customer>;
  category?: Maybe<PostCategory>;
  closesAt?: Maybe<Scalars['Time']['output']>;
  context?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Time']['output'];
  designPhase?: Maybe<DesignPhase>;
  id: Scalars['UUID']['output'];
  opensAt?: Maybe<Scalars['Time']['output']>;
  options?: Maybe<Array<PostOption>>;
  status: PostStatus;
  updatedAt: Scalars['Time']['output'];
  votes?: Maybe<Array<PostVote>>;
};

export type PostCategory =
  | 'ANIMATION'
  | 'BRANDING'
  | 'ILLUSTRATION'
  | 'PRINT'
  | 'PRODUCT'
  | 'TYPOGRAPHY'
  | 'WEB';

export type PostOption = {
  __typename?: 'PostOption';
  id: Scalars['UUID']['output'];
  position: Scalars['Int']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type PostStatus =
  | 'CLOSED'
  | 'DRAFT'
  | 'LIVE';

export type PostVote = {
  __typename?: 'PostVote';
  id: Scalars['UUID']['output'];
  post?: Maybe<Post>;
  reason?: Maybe<Scalars['String']['output']>;
  voter?: Maybe<Customer>;
};

export type Query = {
  __typename?: 'Query';
  customer?: Maybe<Customer>;
  post?: Maybe<Post>;
};


export type QueryPostArgs = {
  id: Scalars['UUID']['input'];
};

export type SignUpError = InvalidEmailError | InvalidReturnToError;

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  profession: Scalars['String']['input'];
  returnTo: Scalars['String']['input'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  errors: Array<SignUpError>;
};

export type TooFewOptionsError = BaseError & {
  __typename?: 'TooFewOptionsError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type TooManyOptionsError = BaseError & {
  __typename?: 'TooManyOptionsError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type UnauthenticatedError = BaseError & {
  __typename?: 'UnauthenticatedError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type UnsupportedFileTypeError = BaseError & {
  __typename?: 'UnsupportedFileTypeError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type UpsertPostError = ClosesAtNotAfterOpensAtError | ErrPostNotOwned | OpensAtAlreadyPassedError | TooFewOptionsError | TooManyOptionsError | UnauthenticatedError | UnsupportedFileTypeError;

export type UpsertPostInput = {
  category?: InputMaybe<PostCategory>;
  closesAt?: InputMaybe<Scalars['Time']['input']>;
  context?: InputMaybe<Scalars['String']['input']>;
  designPhase?: InputMaybe<DesignPhase>;
  id: Scalars['UUID']['input'];
  opensAt?: InputMaybe<Scalars['Time']['input']>;
  options: Array<UpsertPostOptionInput>;
};

export type UpsertPostOptionInput = {
  bucketName: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
  position: Scalars['Int']['input'];
};

export type UpsertPostPayload = {
  __typename?: 'UpsertPostPayload';
  errors: Array<UpsertPostError>;
  post?: Maybe<Post>;
};

export type VerifyCustomerTokenError = LinkExpiredError;

export type VerifyCustomerTokenInput = {
  token: Scalars['String']['input'];
};

export type VerifyCustomerTokenPayload = {
  __typename?: 'VerifyCustomerTokenPayload';
  customer?: Maybe<Customer>;
  errors: Array<VerifyCustomerTokenError>;
  newToken?: Maybe<Scalars['ID']['output']>;
};

export type PostPageQueryVariables = Exact<{
  postId: Scalars['UUID']['input'];
}>;


export type PostPageQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string } | null };

export type GenerateSignedPostOptionUrlMutationVariables = Exact<{
  input: GenerateSignedPostOptionUrInput;
}>;


export type GenerateSignedPostOptionUrlMutation = { __typename?: 'Mutation', generateSignedPostOptionUrl: { __typename?: 'GenerateSignedPostOptionUrlPayload', url: string, bucketName: string, fileKey: string, errors: Array<{ __typename?: 'UnauthenticatedError', message: string } | { __typename?: 'UnsupportedFileTypeError', message: string }> } };

export type ProfilePageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilePageQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string, firstName?: string | null } | null };

export type VerifyCustomerTokenMutationVariables = Exact<{
  input: VerifyCustomerTokenInput;
}>;


export type VerifyCustomerTokenMutation = { __typename?: 'Mutation', verifyCustomerToken: { __typename?: 'VerifyCustomerTokenPayload', newToken?: string | null, customer?: { __typename?: 'Customer', id: string } | null, errors: Array<{ __typename?: 'LinkExpiredError', message: string }> } };

export type WelcomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type WelcomePageQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string } | null };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', errors: Array<{ __typename?: 'InvalidEmailError', message: string } | { __typename?: 'InvalidReturnToError', message: string }> } };


export const PostPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PostPageQuery, PostPageQueryVariables>;
export const GenerateSignedPostOptionUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateSignedPostOptionUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateSignedPostOptionUrInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateSignedPostOptionUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"bucketName"}},{"kind":"Field","name":{"kind":"Name","value":"fileKey"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GenerateSignedPostOptionUrlMutation, GenerateSignedPostOptionUrlMutationVariables>;
export const ProfilePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfilePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<ProfilePageQuery, ProfilePageQueryVariables>;
export const VerifyCustomerTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyCustomerToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCustomerTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCustomerToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newToken"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<VerifyCustomerTokenMutation, VerifyCustomerTokenMutationVariables>;
export const WelcomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WelcomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WelcomePageQuery, WelcomePageQueryVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;