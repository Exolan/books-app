import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../api/'
import { GetBooksResponse, UseBooksResult } from '../types/book'

export function useBooks(): UseBooksResult {
  const { data, loading, error } = useQuery<GetBooksResponse>(GET_BOOKS)

  return {
    books: data?.books ?? [],
    loading,
    error
  }
}
