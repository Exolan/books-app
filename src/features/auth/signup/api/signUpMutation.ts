import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      ... on User {
        id
        email
        name
      }
    }
  }
`
