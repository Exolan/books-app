import { useBooks } from '../../../entities/book/model/useBooks'
import { Book } from '../../../entities/book/types/book'
import BookCard from '../../../entities/book/ui/BookCard'

export default function BooksList() {
  const { books, loading } = useBooks()

  if (loading) {
    return <p>Loading books...</p>
  }

  if (!books.length) {
    return <p>No books found.</p>
  }

  return (
    <ul>
      {books.map((book: Book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  )
}
