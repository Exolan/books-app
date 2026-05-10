import { useRouter } from 'next/router'
import Header from 'src/widgets/header'
import { BookInfo } from 'src/entities/book'

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
