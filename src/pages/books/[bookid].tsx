import { useRouter } from 'next/router'
import Header from '../../widgets/header/ui/Header'
import BookInfo from '../../entities/book/ui/BookInfo'

export default function BookPage() {
  const router = useRouter()
  const { bookid } = router.query

  if (typeof bookid !== 'string') {
    return null
  }

  return (
    <>
      <Header />
      <BookInfo bookId={bookid} />
    </>
  )
}
