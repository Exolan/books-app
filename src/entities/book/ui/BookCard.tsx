import { Book } from '../types/book'

export default function BookCard({ book }: { book: Book }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      <h2>{book.title}</h2>
      <h4>
        {book.author.firstName} {book.author.lastName}
      </h4>
      <p>Средняя оценка: </p>
    </div>
  )
}
