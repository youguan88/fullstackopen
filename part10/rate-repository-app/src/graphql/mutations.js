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