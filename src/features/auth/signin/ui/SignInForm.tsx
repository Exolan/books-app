import { useRouter } from 'next/navigation'
import { useSignIn } from '../model/useSignIn'
import Button from 'src/shared/ui/Button'
import Input from 'src/shared/ui/Input'
import { routes } from 'src/shared/routes'

export function SignInForm() {
  const { push } = useRouter()
  const { signIn, loading } = useSignIn()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (typeof email !== 'string' || !email) {
      alert('Введите корректный email')
      return
    }
    if (typeof password !== 'string' || !password) {
      alert('Введите пароль')
      return
    }

    await signIn({ variables: { email, password } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <div>
          <Input label='Email' type='email' name='email' required />
          <Input label='Password' type='password' name='password' required />
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit' disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </Button>
          <Button type='button' onClick={() => push(routes.auth.signUp)}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
