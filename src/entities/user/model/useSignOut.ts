import { useMutation } from '@apollo/client'
import { SIGN_OUT } from '../api/'

export function useSignOut() {
  const [signOut, { loading, error }] = useMutation(SIGN_OUT)

  return { signOut, loading, error }
}
