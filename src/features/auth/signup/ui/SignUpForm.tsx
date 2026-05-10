import { useRouter } from 'next/navigation'
import Button from 'src/shared/ui/Button'
import Input from 'src/shared/ui/Input'
import { useSignUp } from '../model/useSignUp'

export function SignUpForm() {
  const { signUp, loading, error } = useSignUp()
  const { push } = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    signUp({ variables: { email, password, name } })
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error.message}</p>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <div>
          <Input label='Email' type='email' name='email' required />
          <Input label='Name' type='text' name='name' required />
          <Input label='Password' type='password' name='password' required />
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Button type='submit'>Зарегистрироваться</Button>
          <Button type='button' onClick={() => push('/auth/signin')}>
            Войти
          </Button>
        </div>
      </form>
    </div>
  )
}
