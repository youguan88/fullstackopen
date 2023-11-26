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