import { ApolloError } from '@apollo/client'

export type User = {
  id: string
  name: string
  email: string
}

export type UseAuthResult = {
  user: User | null
  userLoading: boolean
  userError: ApolloError | undefined
}

export type UseAuthResponce = {
  authenticatedItem: User | null
}

export type SignOutResult = {}
