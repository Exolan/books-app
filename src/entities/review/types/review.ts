export type Review = {
  id: string
  text: string | null
  score: number | null
  createdAt: string | null
  user: { id: string; name: string | null } | null
}
