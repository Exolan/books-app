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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBookById($id: ID!) {\n    book(where: { id: $id }) {\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        id\n        text\n        user {\n          id\n          name\n        }\n        score\n        createdAt\n      }\n    }\n  }\n": typeof types.GetBookByIdDocument,
    "\n  query GetBooks {\n    books {\n      id\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        score\n      }\n    }\n  }\n": typeof types.GetBooksDocument,
    "\n  query GetUser {\n    authenticatedItem {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  mutation SignOut {\n    endSession\n  }\n": typeof types.SignOutDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          email\n          name\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignUp($email: String!, $name: String!, $password: String!) {\n    createUser(data: { email: $email, name: $name, password: $password }) {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n": typeof types.SignUpDocument,
    "\n  mutation Mutation($data: ReviewCreateInput!) {\n    createReview(data: $data) {\n      text\n      score\n      user {\n        id\n      }\n    }\n  }\n": typeof types.MutationDocument,
};
const documents: Documents = {
    "\n  query GetBookById($id: ID!) {\n    book(where: { id: $id }) {\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        id\n        text\n        user {\n          id\n          name\n        }\n        score\n        createdAt\n      }\n    }\n  }\n": types.GetBookByIdDocument,
    "\n  query GetBooks {\n    books {\n      id\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        score\n      }\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetUser {\n    authenticatedItem {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation SignOut {\n    endSession\n  }\n": types.SignOutDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          email\n          name\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($email: String!, $name: String!, $password: String!) {\n    createUser(data: { email: $email, name: $name, password: $password }) {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation Mutation($data: ReviewCreateInput!) {\n    createReview(data: $data) {\n      text\n      score\n      user {\n        id\n      }\n    }\n  }\n": types.MutationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBookById($id: ID!) {\n    book(where: { id: $id }) {\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        id\n        text\n        user {\n          id\n          name\n        }\n        score\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBookById($id: ID!) {\n    book(where: { id: $id }) {\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        id\n        text\n        user {\n          id\n          name\n        }\n        score\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks {\n    books {\n      id\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        score\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks {\n    books {\n      id\n      title\n      author {\n        firstName\n        lastName\n      }\n      genre {\n        id\n        name\n      }\n      reviews {\n        score\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser {\n    authenticatedItem {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    authenticatedItem {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignOut {\n    endSession\n  }\n"): (typeof documents)["\n  mutation SignOut {\n    endSession\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          email\n          name\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    authenticateUserWithPassword(email: $email, password: $password) {\n      ... on UserAuthenticationWithPasswordSuccess {\n        sessionToken\n        item {\n          id\n          email\n          name\n        }\n      }\n      ... on UserAuthenticationWithPasswordFailure {\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUp($email: String!, $name: String!, $password: String!) {\n    createUser(data: { email: $email, name: $name, password: $password }) {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp($email: String!, $name: String!, $password: String!) {\n    createUser(data: { email: $email, name: $name, password: $password }) {\n      ... on User {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation($data: ReviewCreateInput!) {\n    createReview(data: $data) {\n      text\n      score\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($data: ReviewCreateInput!) {\n    createReview(data: $data) {\n      text\n      score\n      user {\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;