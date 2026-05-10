import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignUpDocument } from 'src/shared/api/generated/graphql'

export function useSignUp() {
  const { replace } = useRouter()
  const [signUp, { data, loading, error }] = useMutation(SignUpDocument, {
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
