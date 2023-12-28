import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const response = useQuery(GET_REPOSITORIES, {fetchPolicy:'cache-and-network'});
  console.log(response);
  const fetchRepositories = async () => {
      //setLoading(response.loading)
      if(!response.loading && response.data)
      {
        setRepositories(response.data.repositories);
      }
  };

  useEffect(() => {
    fetchRepositories();
  }, [response]);

  //return { repositories, loading, refetch: fetchRepositories };
  return { repositories, refetch: fetchRepositories };
};

export default useRepositories;