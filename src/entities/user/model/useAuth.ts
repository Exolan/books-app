import { useQuery } from '@apollo/client'
import { GetUserDocument } from 'src/shared/api/generated/graphql'

export function useAuth() {
  const { data, loading, error } = useQuery(GetUserDocument)

  return {
    user: data?.authenticatedItem,
    userLoading: loading,
    userError: error
  }
}
