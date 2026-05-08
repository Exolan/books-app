import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../api/getBooks'

export function useBooks() {
  const { data, loading, error } = useQuery(GET_BOOKS)

  return {
    books: data?.books ?? [],
    loading,
    error
  }
}
