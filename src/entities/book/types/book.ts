import { Author } from 'src/entities/author'
import { Genre } from 'src/entities/genre'
import { Review } from 'src/entities/review'
import { ApolloError } from '@apollo/client'

export type Book = {
  id: string
  title: string
  author: Author
  genre: Genre[]
  reviews: Review[]
}

export type UseBookResult = {
  book: Book | null
  loading: boolean
  error: ApolloError | undefined
}

export type UseBooksResult = { books: Book[] | null; loading: boolean; error: ApolloError | undefined }

export type GetBookByIdResponse = {
  book: Book | null
}

export type GetBooksResponse = {
  books: Book[] | null
}
