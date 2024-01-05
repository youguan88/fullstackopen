import { gql } from '@apollo/client';

export const signInToken = gql`
mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        username
      }
      accessToken
      expiresAt
    }
  }
`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    rating
    createdAt
    text
    id
    userId
    repositoryId
  }
}
`