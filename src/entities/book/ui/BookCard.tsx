import { useRouter } from 'next/navigation'
import { Book } from '../types/book'
import { routes } from 'src/shared/routes'

export function BookCard({ book }: { book: Book }) {
  const { push } = useRouter()

  const average = book.reviews ? book.reviews.reduce((acc, review) => acc + Number(review.score), 0) / book.reviews.length : 0

  const handleClick = () => {
    push(routes.books.byId(book.id))
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px', cursor: 'pointer' }} onClick={handleClick}>
      <h2>{book.title}</h2>
      <h4>
        {book.author?.firstName} {book.author?.lastName}
      </h4>
      <p>
        Жанр:{' '}
        {book.genre?.map((genre) => (
          <span key={genre.id}>{genre.name} </span>
        ))}
      </p>
      <p>Средняя оценка: {isNaN(average) ? 0 : average.toFixed(1)}</p>
    </div>
  )
}
