import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignInDocument } from 'src/shared/api/generated/graphql'

export function useSignIn() {
  const { replace } = useRouter()
  const [signIn, { data, loading }] = useMutation(SignInDocument, {
    onCompleted: (result) => {
      const auth = result.authenticateUserWithPassword

      // Проверка, что пользователь вошел
      if (auth && 'item' in auth) {
        replace('/')
      } else {
        alert('Неверный логи или пароль')
      }
    },
    onError: (error) => {
      console.error('Ошибка входа', error)
      alert('Не удалось соединиться с сервером')
    }
  })

  const authResult = data?.authenticateUserWithPassword
  const user = authResult && 'item' in authResult ? authResult.item : null

  return {
    signIn,
    user,
    loading
  }
}
