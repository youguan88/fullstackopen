import { gql } from "@apollo/client";

export const All_Authors = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const All_Books = gql`
query {
  allBooks {
    author
    genres
    published
    title
  }
}
`