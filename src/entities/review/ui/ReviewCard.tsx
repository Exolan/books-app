import { Review } from '../types/review'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div key={review.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', marginBottom: '8px' }}>
      <p>{review.text}</p>
      <p>
        Оценка: {review.score} - <em>{review.user.name}</em>
      </p>
      <p>Дата: {new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
