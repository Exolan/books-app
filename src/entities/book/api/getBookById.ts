import { gql } from '@apollo/client'

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(where: { id: $id }) {
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
        id
        text
        user {
          id
          name
        }
        score
        createdAt
      }
    }
  }
`
