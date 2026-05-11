'use client'

import Button from 'src/shared/ui/Button'
import { useAuth } from 'src/entities/user'
import { useSignOut } from 'src/entities/user'
import { useRouter } from 'next/navigation'
import { routes } from 'src/shared/routes'

export default function Header() {
  const { user, userLoading } = useAuth()
  const { signOut } = useSignOut()
  const { push, refresh } = useRouter()

  const handleLogout = async () => {
    await signOut()
    refresh()
  }

  if (userLoading) return <p>Загрузка...</p>

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <h1>Book App</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h3>Добро пожаловать, {user ? user.name : 'Гость'}!</h3>
        {user ? <Button onClick={handleLogout}>Выйти</Button> : <Button onClick={() => push(routes.auth.signIn)}>Войти</Button>}
      </div>
    </header>
  )
}
