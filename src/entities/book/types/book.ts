export type Book = {
  id: string
  title: string | null
  author: { firstName: string | null; lastName: string | null } | null
  genre: Array<{ id: string; name: string | null }> | null
  reviews: Array<{ score: number | null }> | null
}
