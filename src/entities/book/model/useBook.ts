import { useQuery } from '@apollo/client'
import { GetBookByIdDocument } from 'src/shared/api/generated/graphql'

export function useBook(bookId: string, options?: { skip?: boolean }) {
  const { data, loading, error } = useQuery(GetBookByIdDocument, {
    variables: { id: bookId },
    skip: options?.skip, // Не делать запрос
    fetchPolicy: 'cache-and-network'
  })

  return {
    book: data?.book ?? null, // Явно, чтобы не было undefined
    loading,
    error
  }
}
