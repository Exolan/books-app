import { useQuery } from '@apollo/client'
import { GET_BOOK_BY_ID } from '../api/'
import { GetBookByIdResponse, UseBookResult } from '../types/book'

export function useBook(bookId: string): UseBookResult {
  const { data, loading, error } = useQuery<GetBookByIdResponse>(GET_BOOK_BY_ID, {
    variables: { id: bookId }
  })

  return {
    book: data?.book ?? null, // Явно, чтобы не было undefined
    loading,
    error
  }
}
