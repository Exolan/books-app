import { useMutation } from '@apollo/client'
import { SignOutDocument } from 'src/shared/api/generated/graphql'

export function useSignOut() {
  const [signOut, { loading, error }] = useMutation(SignOutDocument)

  return { signOut, loading, error }
}
