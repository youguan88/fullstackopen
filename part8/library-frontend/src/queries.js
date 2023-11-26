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

export const addBook = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    author
    genres
    published
    title
  }
}
`