import { useState } from 'react'
import Button from '../../../shared/ui/Button'
import { useAuth } from '../../user/model/useAuth'
import useBook from '../model/useBook'
import MyModal from '../../../shared/ui/Modal'
import CreateReviewForm from '../../../features/review/createReview/ui/CreateReviewForm'
import { Review } from '../../review/types/review'
import ReviewCard from '../../review'

export default function BookInfo({ bookId }: { bookId: string }) {
  const { book, loading, error } = useBook(bookId)
  const { user } = useAuth()
  const [isModal, setIsModal] = useState(false)

  const handleModal = () => {
    setIsModal(!isModal)
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка загрузки книги: {error.message}</p>
  if (!book) return <p>Книга не найдена</p>

  console.log('User id:', user?.id)
  console.log('reviews:', book.reviews)

  const hasReview = book.reviews.some((review: Review) => review.user.id === user?.id)

  return (
    <div>
      <MyModal isOpen={isModal} closeModal={handleModal}>
        <CreateReviewForm bookId={bookId} onClose={handleModal} />
      </MyModal>

      <h1>{book.title}</h1>
      <h2>
        {book.author.firstName} {book.author.lastName}
      </h2>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <h4>Жанр:</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          {book.genre.map((genre: { id: string; name: string }) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
      <div>
        <h4>Описание</h4>
      </div>
      <div>
        <h4>Отзывы</h4>
        {book.reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {user && !hasReview && (
        <div style={{ marginTop: '16px' }}>
          <Button onClick={handleModal}>Оставить отзыв</Button>
        </div>
      )}
    </div>
  )
}
