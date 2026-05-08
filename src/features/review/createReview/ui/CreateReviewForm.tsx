import { Rating, TextareaAutosize } from '@mui/material'
import Button from '../../../../shared/ui/Button'
import useCreateReview from '../model/useCreateReview'
import { useAuth } from '../../../../entities/user/model/useAuth'
import { useRouter } from 'next/navigation'
import { red } from '@mui/material/colors'

export default function CreateReviewForm({ bookId, onClose }: { bookId: string; onClose: () => void }) {
  const { user } = useAuth()
  const { refresh } = useRouter()
  const { createReview, loading } = useCreateReview()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const reviewText = formData.get('review')
    const score = formData.get('score')

    if (typeof reviewText !== 'string' || reviewText.trim() === '') {
      alert('Пожалуйста, введите текст отзыва.')
      return
    }

    if (!user) {
      alert('Пожалуйста, войдите в систему, чтобы оставить отзыв.')
      return
    }

    createReview({
      variables: {
        data: {
          text: reviewText.trim(),

          score: Number(score),

          book: {
            connect: {
              id: bookId
            }
          },

          user: {
            connect: {
              id: user.id
            }
          }
        }
      }
    })

    onClose()
    refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Оставить отзыв</h2>
      <TextareaAutosize placeholder='Ваш отзыв' name='review' style={{ width: '100%', height: '100px' }} />
      <Rating name='score' defaultValue={5} max={5} />
      <Button type='submit' disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить'}
      </Button>
    </form>
  )
}
