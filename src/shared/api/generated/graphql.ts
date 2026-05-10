/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AuthorCreateInput = {
  books?: BookRelateToManyForCreateInput | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: UserRelateToOneForCreateInput | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  updatedAt?: string | null | undefined;
  updatedBy?: UserRelateToOneForCreateInput | null | undefined;
};

export type AuthorRelateToOneForCreateInput = {
  connect?: AuthorWhereUniqueInput | null | undefined;
  create?: AuthorCreateInput | null | undefined;
};

export type AuthorWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type BookCreateInput = {
  author?: AuthorRelateToOneForCreateInput | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: UserRelateToOneForCreateInput | null | undefined;
  description?: string | null | undefined;
  genre?: GenreRelateToManyForCreateInput | null | undefined;
  reviews?: ReviewRelateToManyForCreateInput | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
  updatedBy?: UserRelateToOneForCreateInput | null | undefined;
};

export type BookRelateToManyForCreateInput = {
  connect?: Array<BookWhereUniqueInput> | null | undefined;
  create?: Array<BookCreateInput> | null | undefined;
};

export type BookRelateToOneForCreateInput = {
  connect?: BookWhereUniqueInput | null | undefined;
  create?: BookCreateInput | null | undefined;
};

export type BookWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type GenreCreateInput = {
  books?: BookRelateToManyForCreateInput | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: UserRelateToOneForCreateInput | null | undefined;
  name?: string | null | undefined;
  updatedAt?: string | null | undefined;
  updatedBy?: UserRelateToOneForCreateInput | null | undefined;
};

export type GenreRelateToManyForCreateInput = {
  connect?: Array<GenreWhereUniqueInput> | null | undefined;
  create?: Array<GenreCreateInput> | null | undefined;
};

export type GenreWhereUniqueInput = {
  id?: string | number | null | undefined;
  name?: string | null | undefined;
};

export type ReviewCreateInput = {
  book?: BookRelateToOneForCreateInput | null | undefined;
  createdAt?: string | null | undefined;
  createdBy?: UserRelateToOneForCreateInput | null | undefined;
  score?: number | null | undefined;
  text?: string | null | undefined;
  updatedAt?: string | null | undefined;
  updatedBy?: UserRelateToOneForCreateInput | null | undefined;
  user?: UserRelateToOneForCreateInput | null | undefined;
};

export type ReviewRelateToManyForCreateInput = {
  connect?: Array<ReviewWhereUniqueInput> | null | undefined;
  create?: Array<ReviewCreateInput> | null | undefined;
};

export type ReviewWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type UserCreateInput = {
  createdAt?: string | null | undefined;
  createdBy?: UserRelateToOneForCreateInput | null | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  password?: string | null | undefined;
  reviews?: ReviewRelateToManyForCreateInput | null | undefined;
  updatedAt?: string | null | undefined;
  updatedBy?: UserRelateToOneForCreateInput | null | undefined;
};

export type UserRelateToOneForCreateInput = {
  connect?: UserWhereUniqueInput | null | undefined;
  create?: UserCreateInput | null | undefined;
};

export type UserWhereUniqueInput = {
  email?: string | null | undefined;
  id?: string | number | null | undefined;
};

export type GetBookByIdQueryVariables = Exact<{
  id: string | number;
}>;


export type GetBookByIdQuery = { book: { title: string | null, author: { firstName: string | null, lastName: string | null } | null, genre: Array<{ id: string, name: string | null }> | null, reviews: Array<{ id: string, text: string | null, score: number | null, createdAt: string | null, user: { id: string, name: string | null } | null }> | null } | null };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { books: Array<{ id: string, title: string | null, author: { firstName: string | null, lastName: string | null } | null, genre: Array<{ id: string, name: string | null }> | null, reviews: Array<{ score: number | null }> | null }> | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { authenticatedItem: { id: string, email: string | null, name: string | null } | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { endSession: boolean };

export type SignInMutationVariables = Exact<{
  email: string;
  password: string;
}>;


export type SignInMutation = { authenticateUserWithPassword:
    | { message: string }
    | { sessionToken: string, item: { id: string, email: string | null, name: string | null } }
   | null };

export type SignUpMutationVariables = Exact<{
  email: string;
  name: string;
  password: string;
}>;


export type SignUpMutation = { createUser: { id: string, email: string | null, name: string | null } | null };

export type MutationMutationVariables = Exact<{
  data: ReviewCreateInput;
}>;


export type MutationMutation = { createReview: { text: string | null, score: number | null, user: { id: string } | null } | null };


export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticatedItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endSession"}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticateUserWithPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAuthenticationWithPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionToken"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserAuthenticationWithPasswordFailure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;