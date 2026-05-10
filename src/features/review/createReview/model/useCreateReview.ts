import { useMutation } from '@apollo/client'
import { MutationDocument } from 'src/shared/api/generated/graphql'

export function useCreateReview() {
  const [createReview, { data, loading, error }] = useMutation(MutationDocument, {
    onError: (error) => {
      console.error('Ошибка создания отзыва:', error)
    }
  })

  return {
    createReview,
    loading,
    error
  }
}
