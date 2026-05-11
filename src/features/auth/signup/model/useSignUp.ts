import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignUpDocument } from 'src/shared/api/generated/graphql'

export function useSignUp() {
  const [signUp, { loading, error }] = useMutation(SignUpDocument)

  return {
    signUp,
    loading,
    error
  }
}
