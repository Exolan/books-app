import { useQuery } from '@apollo/client'
import { GET_USER } from '../api/getUser'

export const useAuth = () => {
  const { data, loading } = useQuery(GET_USER, { fetchPolicy: 'cache-and-network' })

  return {
    user: data?.authenticatedItem,
    userLoading: loading
  }
}
