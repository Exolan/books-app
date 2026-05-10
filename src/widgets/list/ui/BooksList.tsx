import { useBooks } from 'src/entities/book'
import { BookCard } from 'src/entities/book'

export default function BooksList() {
  const { books, loading } = useBooks()

  if (loading) {
    return <p>Загрузка книг...</p>
  }

  if (!books?.length) {
    return <p>Книг не найдено</p>
  }

  return <ul>{books?.map((book) => <BookCard key={book.id} book={book} />)}</ul>
}
