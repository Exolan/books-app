import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author {
        firstName
        lastName
      }
      genre {
        id
        name
      }
      reviews {
        score
      }
    }
  }
`
