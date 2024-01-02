import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

export const GET_USER = gql`
{
  me {
    id
    username
  }
}
`
export const GET_SINGLE_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    url
  }
}
`