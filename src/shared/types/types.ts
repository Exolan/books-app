export type User = {
  id: string
  email: string
  name: string
}

export type Author = {
  id: string
  firstName: string
  lastName: string
}

export type Review = {
  id: string
  text: string
  score: number
  user: User
}
