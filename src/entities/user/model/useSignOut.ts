import { useMutation } from '@apollo/client'
import { SIGN_OUT } from '../api/signOutUser'

export default function useSignOut() {
  const [signOut, { loading, error }] = useMutation(SIGN_OUT)

  return { signOut, loading, error }
}
