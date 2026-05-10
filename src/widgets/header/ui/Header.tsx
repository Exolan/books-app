import Button from 'src/shared/ui/Button'
import { useAuth } from 'src/entities/user'
import { useSignOut } from 'src/entities/user'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, userLoading } = useAuth()
  const { signOut } = useSignOut()
  const { push, refresh } = useRouter()

  const handleLogout = () => {
    signOut()
    refresh()
  }

  if (userLoading) return <p>Loading...</p>

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <h1>Book App</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h3>Добро пожаловать, {user ? user.name : 'Гость'}!</h3>
        {user ? <Button onClick={handleLogout}>Выйти</Button> : <Button onClick={() => push('/auth/signin')}>Войти</Button>}
      </div>
    </header>
  )
}
