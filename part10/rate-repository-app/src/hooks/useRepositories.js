import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderSelection, filterText) => {
  const [repositories, setRepositories] = useState();
  let variables = {}
  if (orderSelection === "latest")
  {
    variables = {"orderBy": "CREATED_AT", "orderDirection": "DESC"}
  }
  else if (orderSelection === "highest-rated")
  {
    variables =  {"orderBy": "RATING_AVERAGE", "orderDirection": "DESC"}
  }
  else
  {
    variables =  {"orderBy": "RATING_AVERAGE", "orderDirection": "ASC"}
  }
  variables.searchKeyword = filterText;
  const response = useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network' });
  const fetchRepositories = async () => {
    if (!response.loading && response.data) {
      setRepositories(response.data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [response]);

  return { repositories, refetch: fetchRepositories };
};

export default useRepositories;