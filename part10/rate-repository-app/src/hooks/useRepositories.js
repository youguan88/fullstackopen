import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderSelection, filterText, first}) => {
  let variables = {}
  if (orderSelection === "latest") {
    variables = { "orderBy": "CREATED_AT", "orderDirection": "DESC" }
  }
  else if (orderSelection === "highest-rated") {
    variables = { "orderBy": "RATING_AVERAGE", "orderDirection": "DESC" }
  }
  else {
    variables = { "orderBy": "RATING_AVERAGE", "orderDirection": "ASC" }
  }
  variables.searchKeyword = filterText;
  variables.first = first;
  
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network' });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;