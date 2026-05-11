import { Rating, TextareaAutosize } from '@mui/material'
import Button from 'src/shared/ui/Button'
import { useCreateReview } from '../model/useCreateReview'
import { useAuth } from 'src/entities/user'

export function CreateReviewForm({ bookId, onClose }: { bookId: string; onClose: () => void }) {
  const { user } = useAuth()
  const { createReview, loading } = useCreateReview()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const reviewText = formData.get('review')
    const score = formData.get('score')

    // Валидация текста
    if (typeof reviewText !== 'string' || reviewText.trim() === '') {
      alert('Пожалуйста, введите текст отзыва.')
      return
    }

    // Валидация пользователя
    if (!user?.id) {
      alert('Пожалуйста, войдите в систему')
      onClose()
      return
    }

    await createReview({
      variables: {
        data: {
          text: reviewText.trim(),
          score: Number(score),
          book: { connect: { id: bookId } },
          user: { connect: { id: user.id } }
        }
      }
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Оставить отзыв</h2>

      <TextareaAutosize placeholder='Ваш отзыв' name='review' style={{ width: '100%', height: '100px', padding: '8px' }} disabled={loading} />

      <div style={{ marginTop: '1rem' }}>
        <Rating name='score' defaultValue={5} max={5} disabled={loading} />
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button type='button' onClick={onClose} disabled={loading}>
          Отмена
        </Button>
        <Button type='submit' disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </Button>
      </div>
    </form>
  )
}
