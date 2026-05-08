import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../api/signUpMutation'
import { useRouter } from 'next/navigation'

export function useSignUp() {
  const { replace } = useRouter()
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      if (data?.createUser) {
        replace('/auth/signin')
      }
    }
  })

  return {
    signUp,
    loading,
    error
  }
}
