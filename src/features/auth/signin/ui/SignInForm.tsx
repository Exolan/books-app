import { useRouter } from 'next/navigation'
import { useSignIn } from '../model/useSignIn'
import Button from '../../../../shared/ui/Button'
import Input from '../../../../shared/ui/Input'

export default function SignInForm() {
  const { push } = useRouter()
  const { signIn } = useSignIn()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    signIn({ variables: { email, password } })
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
          <Button type='submit'>Войти</Button>
          <Button type='button' onClick={() => push('/auth/signup')}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
