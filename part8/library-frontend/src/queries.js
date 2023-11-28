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
    title
    published
    author {
      name
      born
      bookCount
      id
    }
    genres
    id
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

export const editAuthor = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    bookCount
    born
    name
  }
}
`

