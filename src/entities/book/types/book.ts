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
  }
  //   reviews: Review[]
}
