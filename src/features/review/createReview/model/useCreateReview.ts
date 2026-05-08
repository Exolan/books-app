import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../api/createReview'

export default function useCreateReview() {
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
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
