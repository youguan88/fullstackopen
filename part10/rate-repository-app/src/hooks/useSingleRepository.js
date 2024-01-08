import { useQuery } from "@apollo/client"
import { GET_SINGLE_REPOSITORY } from "../graphql/queries"

const useSingleRepository = ({id, first}) => {
    let variables = {"repositoryId": id};
    if (first)
    {
        variables.first = first
    }
    const {data, loading, fetchMore, ...result} = useQuery(GET_SINGLE_REPOSITORY,
        { variables: variables, fetchPolicy: 'cache-and-network' }
    )
    
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore)
        {
            return;
        }
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {repository: data?.repository, loading, fetchMore: handleFetchMore, ...result};

}

export default useSingleRepository;