import { Book } from '../types/book'

export default function BookCard({ book }: { book: Book }) {
  const average = book.reviews.reduce((acc, review) => acc + review.score, 0) / book.reviews.length

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px', cursor: 'pointer' }}>
      <h2>{book.title}</h2>
      <h4>
        {book.author.firstName} {book.author.lastName}
      </h4>
      <p>
        Жанр:{' '}
        {book.genre.map((genre) => (
          <span key={genre.id}>{genre.name} </span>
        ))}
      </p>
      <p>Средняя оценка: {isNaN(average) ? 0 : average.toFixed(1)}</p>
    </div>
  )
}
