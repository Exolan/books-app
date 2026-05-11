import { useQuery } from '@apollo/client'
import { GetUserDocument } from 'src/shared/api/generated/graphql'

export function useAuth() {
  const { data, loading, error } = useQuery(GetUserDocument, { fetchPolicy: 'cache-and-network' })

  return {
    user: data?.authenticatedItem,
    userLoading: loading,
    userError: error
  }
}
