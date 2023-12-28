import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'

const baseUri = Constants.expoConfig.extra.apollo_uri

const httpLink = createHttpLink({
  uri: `${baseUri}:4000/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;