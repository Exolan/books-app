import { useQuery } from '@apollo/client'
import { GET_USER } from '../api'
import { UseAuthResponce, UseAuthResult } from '../types/user'

export function useAuth(): UseAuthResult {
  const { data, loading, error } = useQuery<UseAuthResponce>(GET_USER, { fetchPolicy: 'cache-and-network' }) // Убрать политику?

  return {
    user: data?.authenticatedItem ?? null,
    userLoading: loading,
    userError: error
  }
}
