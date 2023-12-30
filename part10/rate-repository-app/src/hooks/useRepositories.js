import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const response = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
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