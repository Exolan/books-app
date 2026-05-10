import { useQuery } from '@apollo/client'
import { GET_USER } from '../api'
import { UseAuthResult } from '../types/user'

export function useAuth(): UseAuthResult {
  const { data, loading } = useQuery(GET_USER, { fetchPolicy: 'cache-and-network' })

  return {
    user: data?.authenticatedItem,
    userLoading: loading
  }
}
