import { useQuery } from '@apollo/client'
import { GET_BOOK_BY_ID } from '../api/getBookById'

export default function useBook(bookId: string) {
  const { data, loading, error } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId }
  })

  return {
    book: data?.book,
    loading,
    error
  }
}
