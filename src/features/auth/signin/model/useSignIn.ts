import { useMutation } from '@apollo/client'
import { SIGN_IN } from '../api/signInMutation'
import { useRouter } from 'next/navigation'

export function useSignIn() {
  const { replace } = useRouter()
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      if (data?.authenticateUserWithPassword) {
        replace('/')
      }
    }
  })

  return {
    signIn,
    user: data?.authenticateUserWithPassword?.item,
    loading,
    error
  }
}
