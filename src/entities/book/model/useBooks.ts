'use client'

import { useQuery } from '@apollo/client'
import { GetBooksDocument } from 'src/shared/api/generated/graphql'

export function useBooks() {
  const { data, loading, error } = useQuery(GetBooksDocument, { fetchPolicy: 'cache-and-network' })

  return {
    books: data?.books ?? [],
    loading,
    error
  }
}
