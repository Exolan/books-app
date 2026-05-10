import { useQuery } from '@apollo/client'
import { GetBookByIdDocument } from 'src/shared/api/generated/graphql'

export function useBook(bookId: string) {
  const { data, loading, error } = useQuery(GetBookByIdDocument, {
    variables: { id: bookId }
  })

  return {
    book: data?.book ?? null, // Явно, чтобы не было undefined
    loading,
    error
  }
}
