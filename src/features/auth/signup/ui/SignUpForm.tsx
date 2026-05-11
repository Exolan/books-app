import { useRouter } from 'next/navigation'
import Button from 'src/shared/ui/Button'
import Input from 'src/shared/ui/Input'
import { useSignUp } from '../model/useSignUp'
import { ApolloError } from '@apollo/client'

export function SignUpForm() {
  const { signUp, loading } = useSignUp()
  const { push, replace } = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    if (typeof email !== 'string' || !email) {
      alert('Введите корректный email')
      return
    }
    if (typeof password !== 'string' || !password) {
      alert('Введите пароль')
      return
    }
    if (typeof name !== 'string' || !name) {
      alert('Введите корректное имя')
      return
    }

    try {
      const result = await signUp({ variables: { email, password, name } })
      if (result.data?.createUser?.id) {
        replace('/auth/signin')
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        alert(error.message)
      } else {
        alert('Не удалось зарегистрироваться, попробуйте еще раз')
      }
    }
  }

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
          <Button type='submit' disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          <Button type='button' onClick={() => push('/auth/signin')}>
            Войти
          </Button>
        </div>
      </form>
    </div>
  )
}
