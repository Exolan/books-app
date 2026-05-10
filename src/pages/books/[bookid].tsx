import { useRouter } from 'next/router'
import { useState } from 'react'
import Header from 'src/widgets/header'
import MyModal from 'src/shared/ui/Modal'
import CreateReviewForm from 'src/features/review/createReview/ui/CreateReviewForm'
import { useBook } from 'src/entities/book'
import { useAuth } from 'src/entities/user'
import { ReviewCard } from 'src/entities/review'
import Button from 'src/shared/ui/Button'

export default function BookPage() {
  const router = useRouter()
  const [isModal, setIsModal] = useState(false)
  const { bookid } = router.query
  const isValidId = typeof bookid === 'string' // Проверка, что это id
  const { book, loading, error } = useBook(isValidId ? bookid : '', { skip: !isValidId })
  const { user } = useAuth()

  const handleModal = () => setIsModal((prev) => !prev)

  if (!router.isReady || !isValidId) {
    return <p>Загрузка страницы...</p>
  }

  if (loading) return <p>Загрузка книги...</p>
  if (error) return <p>Ошибка: {error.message}</p>
  if (!book) return <p>Книга не найдена</p>

  const hasReview = book.reviews?.some((r) => r.user?.id === user?.id) ?? false

  return (
    <>
      <Header />

      <MyModal isOpen={isModal} closeModal={handleModal}>
        <CreateReviewForm bookId={bookid} onClose={handleModal} />
      </MyModal>

      <div>
        <h1>{book.title ?? 'Без названия'}</h1>
        <h2>{book.author ? `${book.author.firstName ?? ''} ${book.author.lastName ?? ''}` : 'Автор не указан'}</h2>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <h4>Жанр:</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {book.genre?.length ? book.genre.map((g) => <span key={g.id}>{g.name ?? 'Без имени'}</span>) : <span>Не указан</span>}
          </div>
        </div>

        <div>
          <h4>Описание</h4>
        </div>

        <div>
          <h4>Отзывы</h4>
          {book.reviews?.length ? book.reviews.map((r) => <ReviewCard key={r.id} review={r} />) : <p>Отзывов пока нет</p>}
        </div>

        {user && !hasReview && (
          <div style={{ marginTop: '16px' }}>
            <Button onClick={handleModal}>Оставить отзыв</Button>
          </div>
        )}
      </div>
    </>
  )
}
