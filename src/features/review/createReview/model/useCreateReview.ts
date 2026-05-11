'use client'

import { useMutation } from '@apollo/client'
import { MutationDocument } from 'src/shared/api/generated/graphql'

export function useCreateReview() {
  const [createReview, { loading, error }] = useMutation(MutationDocument, {
    onCompleted: (result) => {
      if (result?.createReview?.text) {
        alert('Отзыв успешно добавлен!')
      }
    },
    onError: (error) => {
      console.error('Ошибка создания отзыва:', error)
      const message = error.graphQLErrors?.[0]?.message

      if (message?.includes('Unique')) {
        alert('Вы уже оставили отзыв на эту книгу')
      } else {
        alert(message || 'Не удалось отправить отзыв. Попробуйте позже')
      }
    }
  })

  return {
    createReview,
    loading,
    error
  }
}
