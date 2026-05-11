'use client'

import { useBooks } from 'src/entities/book'
import { BookCard } from 'src/entities/book'

export default function BooksList() {
  const { books, loading, error } = useBooks()

  if (loading) {
    return <p>Загрузка книг...</p>
  }

  if (error) {
    console.error('Ошибка загрузки книг:', error)
    return <p>Не удалось загрузить книги. Попробуйте позже</p>
  }

  if (!books?.length) {
    return <p>Книг не найдено</p>
  }

  return (
    <ul>
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  )
}
