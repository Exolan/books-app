import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      author {
        firstName
        id
        lastName
      }
      genre {
        id
        name
      }
      id
      reviews {
        id
        text
        score
        createdAt
        user {
          id
          name
        }
      }
      title
    }
  }
`
