export type Book = {
  id: string
  title: string
  author: {
    id: string
    firstName: string
    lastName: string
  }
  genre: {
    id: string
    name: string
  }[]
  reviews: {
    id: string
    text: string
    score: number
    createdAt: Date
    user: {
      id: string
      name: string
    }
  }[]
}
