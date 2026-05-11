'use client'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignUpDocument } from 'src/shared/api/generated/graphql'
import { routes } from 'src/shared/routes'

export function useSignUp() {
  const { replace } = useRouter()

  const [signUp, { loading }] = useMutation(SignUpDocument, {
    onCompleted: (result) => {
      if (result?.createUser?.id) {
        replace(routes.auth.signIn)
      }
    },

    onError: (error) => {
      console.error('Ошибка регистрации:', error)

      const message = error.graphQLErrors?.[0]?.message

      if (message?.includes('email')) {
        alert('Пользователь с таким email уже существует')
      } else {
        alert(message || 'Ошибка регистрации. Попробуйте позже')
      }
    }
  })

  return {
    signUp,
    loading
  }
}
