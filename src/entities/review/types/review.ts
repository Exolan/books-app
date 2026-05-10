import { User } from 'src/entities/user'

export type Review = {
  id: string
  text: string
  score: number
  user: User
  createdAt: string
}
