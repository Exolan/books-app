import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`
