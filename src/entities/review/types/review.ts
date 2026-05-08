export type Review = {
  id: string
  text: string
  score: number
  user: {
    id: string
    name: string
  }
  createdAt: string
}
