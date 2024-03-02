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

export type Customer = {
  __typename?: 'Customer';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  profession: Scalars['String']['output'];
};

export type CustomerNotFoundError = BaseError & {
  __typename?: 'CustomerNotFoundError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
};

export type EmailTakenError = BaseError & {
  __typename?: 'EmailTakenError';
  message: Scalars['String']['output'];
  path?: Maybe<Array<Scalars['String']['output']>>;
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
  getLoginLink: GetLoginLinkPayload;
  signUp: SignUpPayload;
  verifyCustomerToken: VerifyCustomerTokenPayload;
};


export type MutationGetLoginLinkArgs = {
  input: GetLoginLinkInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationVerifyCustomerTokenArgs = {
  input: VerifyCustomerTokenInput;
};

export type Query = {
  __typename?: 'Query';
  customer?: Maybe<Customer>;
};

export type SignUpError = EmailTakenError | InvalidEmailError | InvalidReturnToError;

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

export type ProfilePageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilePageQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string, firstName: string } | null };

export type VerifyCustomerTokenMutationVariables = Exact<{
  input: VerifyCustomerTokenInput;
}>;


export type VerifyCustomerTokenMutation = { __typename?: 'Mutation', verifyCustomerToken: { __typename?: 'VerifyCustomerTokenPayload', newToken?: string | null, customer?: { __typename?: 'Customer', id: string } | null, errors: Array<{ __typename?: 'LinkExpiredError', message: string }> } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpPayload', errors: Array<{ __typename?: 'EmailTakenError', message: string } | { __typename?: 'InvalidEmailError', message: string } | { __typename?: 'InvalidReturnToError', message: string }> } };

export type WelcomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type WelcomePageQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string } | null };


export const ProfilePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfilePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]} as unknown as DocumentNode<ProfilePageQuery, ProfilePageQueryVariables>;
export const VerifyCustomerTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyCustomerToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCustomerTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCustomerToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newToken"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<VerifyCustomerTokenMutation, VerifyCustomerTokenMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BaseError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const WelcomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WelcomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WelcomePageQuery, WelcomePageQueryVariables>;